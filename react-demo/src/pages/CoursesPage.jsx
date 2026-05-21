import { useEffect, useState } from 'react';
import { getCourses, createCourse } from '../services/courseService';
import CourseCard from '../components/CourseCard/CourseCard';
import { useAuthContext } from '../hooks/useAuthContext';
import './CoursesPage.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: '',
    credits: '',
    teacherId: ''
  });
  const { userId } = useAuthContext();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getCourses();
      setCourses(data || []);
      setError('');
    } catch (err) {
      setError('Failed to load courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourse({
        ...formData,
        credits: parseInt(formData.credits),
        teacherId: userId
      });
      setFormData({ name: '', description: '', code: '', credits: '', teacherId: '' });
      setShowForm(false);
      await fetchCourses();
    } catch (err) {
      setError('Failed to create course');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="courses-page">
      <header className="page-header">
        <h1>📚 Courses</h1>
        <button 
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ New Course'}
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="course-form">
            <input
              type="text"
              name="name"
              placeholder="Course Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Course Description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
            />
            <input
              type="text"
              name="code"
              placeholder="Course Code (e.g., CS101)"
              value={formData.code}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="credits"
              placeholder="Credits"
              value={formData.credits}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="submit-btn">Create Course</button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading courses...</div>
      ) : courses.length === 0 ? (
        <div className="empty-state">
          <p>No courses available</p>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
