import { apiClient } from './apiClient';

// GET /api/activities/:id
export const getActivity = (id) =>
  apiClient(`/activities/${id}`);

// GET /api/activities/course/:courseId
export const getActivitiesByCourse = (courseId) =>
  apiClient(`/activities/course/${courseId}`);

// POST /api/activities  — body: { name, description, deadline, weight, courseId }
export const createActivity = (activityData) =>
  apiClient('/activities', {
    method: 'POST',
    body: JSON.stringify(activityData),
  });

// PUT /api/activities/:id
export const updateActivity = (id, activityData) =>
  apiClient(`/activities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(activityData),
  });

// DELETE /api/activities/:id
export const deleteActivity = (id) =>
  apiClient(`/activities/${id}`, { method: 'DELETE' });