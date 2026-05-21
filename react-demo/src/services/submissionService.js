import { apiClient } from './apiClient';

// GET /api/submissions/:id
export const getSubmission = (id) =>
  apiClient(`/submissions/${id}`);

// GET /api/submissions/activity/:activityId
export const getSubmissionsByActivity = (activityId) =>
  apiClient(`/submissions/activity/${activityId}`);

// POST /api/submissions  — body: { content, activityId, studentId }
export const createSubmission = (submissionData) =>
  apiClient('/submissions', {
    method: 'POST',
    body: JSON.stringify(submissionData),
  });

// PUT /api/submissions/:id  — body: { content, activityId, studentId }
export const updateSubmission = (id, submissionData) =>
  apiClient(`/submissions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(submissionData),
  });

// DELETE /api/submissions/:id
export const deleteSubmission = (id) =>
  apiClient(`/submissions/${id}`, { method: 'DELETE' });

// PATCH /api/submissions/:id/grade?grade=X&feedback=Y
export const gradeSubmission = (id, grade, feedback) =>
  apiClient(
    `/submissions/${id}/grade?grade=${grade}&feedback=${encodeURIComponent(feedback)}`,
    { method: 'PATCH' }
  );