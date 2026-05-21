// src/services/apiClient.js
const BASE_URL = 'http://localhost:8080/auth/api';
const getToken = () => localStorage.getItem('token');

export const apiClient = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  // ✅ Si el token venció o no tienes permisos → limpiar y redirigir
  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.href = '/login';
    return;
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error HTTP ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
};