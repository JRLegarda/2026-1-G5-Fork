import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCourseById } from '../services/courseService';
import { getActivitiesByCourse } from '../services/activityService';
import ActivityCard from '../components/ActivityCard/ActivityCard';
import './CourseDetail.css';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const courseData = await getCourseById(courseId);
      setCourse(courseData);

      const activitiesData = await getActivitiesByCourse(courseId);
      setActivities(activitiesData || []);
      setError('');
    } catch (err) {
      setError('Failed to load course details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="course-detail loading-container">Loading...</div>;
  }

  if (error || !course) {
    return (
      <div className="course-detail error-container">
        <div className="error-box">
          <p>{error || 'Course not found'}</p>
          <button onClick={() => navigate('/courses')} className="back-btn">
            ← Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail">
      <button onClick={() => navigate('/courses')} className="back-btn">
        ← Back to Courses
      </button>

      <div className="course-hero">
        <div className="course-hero-content">
          <h1>{course.name}</h1>
          <div className="course-badges">
            <span className="badge code">{course.code}</span>
            <span className="badge credits">Credits: {course.credits}</span>
          </div>
          <p className="course-description">{course.description}</p>
          <div className="course-meta">
            <span className="teacher-info">👨‍🏫 Teacher ID: {course.teacherId}</span>
          </div>
        </div>
      </div>

      <div className="activities-section">
        <div className="section-header">
          <h2>📋 Activities</h2>
          <span className="activity-count">{activities.length} activities</span>
        </div>

        {activities.length === 0 ? (
          <div className="empty-state">
            <p>No activities for this course yet</p>
          </div>
        ) : (
          <div className="activities-list">
            {activities.map(activity => (
              <ActivityCard 
                key={activity.id} 
                activity={activity}
                courseId={courseId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
