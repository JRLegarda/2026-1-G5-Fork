import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { logout } from '../../services/authService';
import './style.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { userId, setIsAuthenticated } = useAuthContext();

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/courses" className="navbar-logo">
          📚 EduConnect
        </Link>

        <div className="nav-menu">
          <Link to="/courses" className="nav-link">
            Courses
          </Link>
        </div>

        <div className="nav-user">
          <span className="user-id">👤 {userId}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
