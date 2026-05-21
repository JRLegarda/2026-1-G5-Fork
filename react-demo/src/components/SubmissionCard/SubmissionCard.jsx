import './style.css';

const SubmissionCard = ({ submission, onGrade, onDelete }) => {
  const submittedDate = new Date(submission.createdAt).toLocaleDateString();
  const gradeStatus = submission.grade !== null ? 'graded' : 'pending';

  return (
    <div className={`submission-card ${gradeStatus}`}>
      <div className="submission-header">
        <div className="student-info">
          <h3>Student ID: {submission.studentId}</h3>
          <span className={`status ${gradeStatus}`}>
            {gradeStatus === 'graded' ? `Grade: ${submission.grade}` : 'Pending'}
          </span>
        </div>
        <span className="submitted-date">{submittedDate}</span>
      </div>

      <div className="submission-content">
        <p className="content-label">Content:</p>
        <p className="content-text">{submission.content}</p>
      </div>

      {submission.feedback && (
        <div className="feedback">
          <p className="feedback-label">Feedback:</p>
          <p className="feedback-text">{submission.feedback}</p>
        </div>
      )}

      <div className="submission-actions">
        <button 
          className="action-btn grade-btn"
          onClick={() => onGrade(submission)}
          title="Grade this submission"
        >
          ✎ Grade
        </button>
        <button 
          className="action-btn delete-btn"
          onClick={() => onDelete(submission.id)}
          title="Delete this submission"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default SubmissionCard;
