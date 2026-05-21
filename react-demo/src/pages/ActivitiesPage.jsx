import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getActivitiesByCourse, getActivity, updateActivity, deleteActivity } from '../services/activityService';
import ActivityCard from '../components/ActivityCard/ActivityCard';
import './ActivitiesPage.css';

const ActivitiesPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: '',
    weight: '',
    courseId: courseId
  });

  useEffect(() => {
    fetchActivities();
  }, [courseId]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const data = await getActivitiesByCourse(courseId);
      setActivities(data || []);
      setError('');
    } catch (err) {
      setError('Failed to load activities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateActivity(editingId, formData);
      } else {
        // Create new activity (requires API endpoint)
        console.log('Create activity:', formData);
      }
      setFormData({
        name: '',
        description: '',
        deadline: '',
        weight: '',
        courseId
      });
      setShowForm(false);
      setEditingId(null);
      await fetchActivities();
    } catch (err) {
      setError('Failed to save activity');
      console.error(err);
    }
  };

  const handleDelete = async (activityId) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await deleteActivity(activityId);
        await fetchActivities();
      } catch (err) {
        setError('Failed to delete activity');
        console.error(err);
      }
    }
  };

  const handleEdit = (activity) => {
    setFormData({
      name: activity.name,
      description: activity.description,
      deadline: activity.deadline,
      weight: activity.weight,
      courseId
    });
    setEditingId(activity.id);
    setShowForm(true);
  };

  return (
    <div className="activities-page">
      <header className="page-header">
        <button onClick={() => navigate(`/courses/${courseId}`)} className="back-btn">
          ← Back
        </button>
        <h1>📋 Activities</h1>
        <button
          className="add-btn"
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              name: '',
              description: '',
              deadline: '',
              weight: '',
              courseId
            });
          }}
        >
          {showForm ? '✕ Cancel' : '+ New Activity'}
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="activity-form">
            <input
              type="text"
              name="name"
              placeholder="Activity Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Activity Description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
            />
            <input
              type="datetime-local"
              name="deadline"
              placeholder="Deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (%)"
              value={formData.weight}
              onChange={handleInputChange}
              min="0"
              max="100"
              required
            />
            <button type="submit" className="submit-btn">
              {editingId ? 'Update Activity' : 'Create Activity'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading activities...</div>
      ) : activities.length === 0 ? (
        <div className="empty-state">
          <p>No activities available</p>
        </div>
      ) : (
        <div className="activities-container">
          {activities.map(activity => (
            <div key={activity.id} className="activity-item">
              <ActivityCard 
                activity={activity}
                courseId={courseId}
              />
              <div className="activity-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(activity)}
                  title="Edit this activity"
                >
                  ✎ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(activity.id)}
                  title="Delete this activity"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitiesPage;
