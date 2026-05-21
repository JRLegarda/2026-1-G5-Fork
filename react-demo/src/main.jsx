// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import './index.css'

// ── Páginas que crearás (Paso 4) ──────────────────────────
import CoursesPage    from './pages/CoursesPage.jsx'
import CourseDetail   from './pages/CourseDetail.jsx'
import ActivitiesPage from './pages/ActivitiesPage.jsx'
import SubmissionsPage from './pages/SubmissionsPage.jsx'

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/courses',                          element: <CoursesPage />     },
      { path: '/courses/:courseId',                element: <CourseDetail />    },
      { path: '/courses/:courseId/activities',     element: <ActivitiesPage />  },
      { path: '/activities/:activityId/submissions', element: <SubmissionsPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)