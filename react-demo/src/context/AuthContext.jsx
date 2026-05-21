// src/context/AuthContext.jsx
import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ username: '', permissions: [] });
  const isAuth = localStorage.getItem('isAuth');
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth === 'true');

  const fromLocal = (value) => {
    setIsAuthenticated(value);
    localStorage.setItem('isAuth', value);
    if (!value) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  };

  // ✅ Exponer userId y token para que los componentes los usen
  const userId = localStorage.getItem('userId');
  const token  = localStorage.getItem('token');

  return (
    <AuthContext.Provider
      value={{ user: authData, isAuthenticated, userId, token, setUser: setAuthData, setIsAuthenticated: fromLocal }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };