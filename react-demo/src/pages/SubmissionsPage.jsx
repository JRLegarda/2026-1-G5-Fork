import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubmissionsByActivity, createSubmission, updateSubmission, deleteSubmission, gradeSubmission } from '../services/submissionService';
import { getActivity } from '../services/activityService';
import SubmissionCard from '../components/SubmissionCard/SubmissionCard';
import { useAuthContext } from '../hooks/useAuthContext';
import './SubmissionsPage.css';

const SubmissionsPage = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { userId } = useAuthContext();
  const [submissions, setSubmissions] = useState([]);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [gradingSubmission, setGradingSubmission] = useState(null);
  const [gradeData, setGradeData] = useState({ grade: '', feedback: '' });
  const [submissionContent, setSubmissionContent] = useState('');

  useEffect(() => {
    fetchData();
  }, [activityId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [submissionsData, activityData] = await Promise.all([
        getSubmissionsByActivity(activityId),
        getActivity(activityId)
      ]);
      setSubmissions(submissionsData || []);
      setActivity(activityData);
      setError('');
    } catch (err) {
      setError('Failed to load submissions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submissionContent.trim()) {
      setError('Content cannot be empty');
      return;
    }

    try {
      const submissionData = {
        content: submissionContent,
        activityId: parseInt(activityId),
        studentId: userId
      };
      await createSubmission(submissionData);
      setSubmissionContent('');
      setShowForm(false);
      await fetchData();
    } catch (err) {
      setError('Failed to create submission');
      console.error(err);
    }
  };

  const handleGradeSubmission = (submission) => {
    setGradingSubmission(submission);
    setGradeData({
      grade: submission.grade || '',
      feedback: submission.feedback || ''
    });
    setShowGradeModal(true);
  };

  const handleGradeSubmit = async (e) => {
    e.preventDefault();
    try {
      await gradeSubmission(
        gradingSubmission.id,
        parseInt(gradeData.grade),
        gradeData.feedback
      );
      setShowGradeModal(false);
      setGradingSubmission(null);
      await fetchData();
    } catch (err) {
      setError('Failed to grade submission');
      console.error(err);
    }
  };

  const handleDeleteSubmission = async (submissionId) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await deleteSubmission(submissionId);
        await fetchData();
      } catch (err) {
        setError('Failed to delete submission');
        console.error(err);
      }
    }
  };

  return (
    <div className="submissions-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      {activity && (
        <div className="activity-header-banner">
          <h1>{activity.name}</h1>
          <div className="activity-meta">
            <span>Weight: {activity.weight}%</span>
            <span>Deadline: {new Date(activity.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="submissions-header">
        <h2>📤 Submissions ({submissions.length})</h2>
        <button
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Submit'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="submission-form">
            <textarea
              placeholder="Your submission content..."
              value={submissionContent}
              onChange={(e) => setSubmissionContent(e.target.value)}
              required
              rows="6"
            />
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading submissions...</div>
      ) : submissions.length === 0 ? (
        <div className="empty-state">
          <p>No submissions yet</p>
        </div>
      ) : (
        <div className="submissions-list">
          {submissions.map(submission => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              onGrade={handleGradeSubmission}
              onDelete={handleDeleteSubmission}
            />
          ))}
        </div>
      )}

      {showGradeModal && gradingSubmission && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Grade Submission</h3>
              <button
                className="close-btn"
                onClick={() => setShowGradeModal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleGradeSubmit} className="grade-form">
              <div className="form-group">
                <label htmlFor="grade">Grade (0-100)</label>
                <input
                  id="grade"
                  type="number"
                  min="0"
                  max="100"
                  value={gradeData.grade}
                  onChange={(e) => setGradeData({
                    ...gradeData,
                    grade: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="feedback">Feedback</label>
                <textarea
                  id="feedback"
                  value={gradeData.feedback}
                  onChange={(e) => setGradeData({
                    ...gradeData,
                    feedback: e.target.value
                  })}
                  rows="4"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowGradeModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Save Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsPage;
