import { apiClient } from './apiClient';

export const login = async (username, password) => {
  try {
    const data = await apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    // ✅ Guardar token y datos del usuario
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.id);

    return { ...data, success: true };
  } catch (error) {
    return { error, success: false };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('isAuth');
};