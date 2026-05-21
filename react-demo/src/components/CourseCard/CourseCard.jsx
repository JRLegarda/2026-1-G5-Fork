import { Link } from 'react-router-dom';
import './style.css';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-card-header">
        <h3>{course.name}</h3>
        <span className="course-code">{course.code}</span>
      </div>
      <p className="course-description">{course.description}</p>
      <div className="course-info">
        <span className="credits">Credits: {course.credits}</span>
        <span className="teacher-id">Teacher ID: {course.teacherId}</span>
      </div>
      <Link to={`/courses/${course.id}`} className="course-link">
        View Details →
      </Link>
    </div>
  );
};

export default CourseCard;
