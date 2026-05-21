import { Link } from 'react-router-dom';
import './style.css';

const ActivityCard = ({ activity, courseId }) => {
  const deadline = new Date(activity.deadline).toLocaleDateString();
  const isOverdue = new Date(activity.deadline) < new Date();

  return (
    <div className={`activity-card ${isOverdue ? 'overdue' : ''}`}>
      <div className="activity-header">
        <h3>{activity.name}</h3>
        {isOverdue && <span className="overdue-badge">Overdue</span>}
      </div>
      <p className="activity-description">{activity.description}</p>
      <div className="activity-meta">
        <div className="deadline">
          <span className="label">Deadline:</span>
          <span className={`date ${isOverdue ? 'overdue' : ''}`}>{deadline}</span>
        </div>
        <div className="weight">
          <span className="label">Weight:</span>
          <span className="value">{activity.weight}%</span>
        </div>
      </div>
      <Link 
        to={`/courses/${courseId}/activities`} 
        state={{ activityId: activity.id }}
        className="activity-link"
      >
        View Submissions →
      </Link>
    </div>
  );
};

export default ActivityCard;
