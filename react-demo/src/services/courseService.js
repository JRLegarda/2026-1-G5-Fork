import { apiClient } from './apiClient';

// GET /api/courses
export const getCourses = () =>
  apiClient('/courses');

// GET /api/courses/:id
export const getCourseById = (id) =>
  apiClient(`/courses/${id}`);

// POST /api/courses  — body: { name, description, code, credits, teacherId }
export const createCourse = (courseData) =>
  apiClient('/courses', {
    method: 'POST',
    body: JSON.stringify(courseData),
  });

// PUT /api/courses/:id  — body: { name, description, code, credits, teacherId }
export const updateCourse = (id, courseData) =>
  apiClient(`/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(courseData),
  });

// DELETE /api/courses/:id
export const deleteCourse = (id) =>
  apiClient(`/courses/${id}`, { method: 'DELETE' });

// POST /api/courses/:id/enroll/:userId
export const enrollUser = (courseId, userId) =>
  apiClient(`/courses/${courseId}/enroll/${userId}`, { method: 'POST' });