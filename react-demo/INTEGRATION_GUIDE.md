# React Demo - Auth Integration Guide

## ✅ Completado

Tu proyecto de `react-demo` está completamente integrado con la API de `auth`. Aquí está lo que se implementó:

### 📦 Servicios (Ya Existían)
- ✅ `authService.js` - Gestión de login/logout
- ✅ `courseService.js` - CRUD de cursos
- ✅ `activityService.js` - CRUD de actividades
- ✅ `submissionService.js` - CRUD de submisiones
- ✅ `apiClient.js` - Cliente HTTP con autenticación automática

### 🔐 Context & Hooks
- ✅ `AuthContext` - Contexto de autenticación global
- ✅ `useAuthContext()` - Hook para acceder al contexto
- ✅ `usePermission()` - Hook mejorado para validar permisos

### 🛡️ Componentes de Seguridad
- ✅ `ProtectedRoute` - Guarda rutas basadas en autenticación
- ✅ Navbar - Navegación y logout

### 📊 Componentes Reutilizables
- ✅ `CourseCard` - Tarjeta de curso con detalles
- ✅ `ActivityCard` - Tarjeta de actividad con status
- ✅ `SubmissionCard` - Tarjeta de submisión con acciones

### 📄 Páginas Completadas
1. **CoursesPage** (`/courses`)
   - Lista todos los cursos
   - Permite crear nuevos cursos
   - Tarjetas interactivas con enlace a detalles

2. **CourseDetail** (`/courses/:courseId`)
   - Muestra detalles del curso
   - Lista actividades del curso
   - Información del profesor

3. **ActivitiesPage** (`/courses/:courseId/activities`)
   - Lista actividades del curso
   - CRUD de actividades
   - Indicadores de fecha vencida

4. **SubmissionsPage** (`/activities/:activityId/submissions`)
   - Lista submisiones de una actividad
   - Crear submisiones
   - Calificar submisiones con feedback
   - Modal de calificación

### 🎨 Estilos CSS
- ✅ Estilos globales en `index.css`
- ✅ Tema de gradientes degradados consistente
- ✅ Responsive design para móvil
- ✅ Animaciones suaves
- ✅ Estilos para todos los componentes y páginas

---

## 🚀 Flujo de la Aplicación

```
Login (/login)
   ↓
CoursesPage (/courses)
   ↓
CourseDetail (/courses/:courseId)
   ├→ ActivitiesPage (/courses/:courseId/activities)
   └→ SubmissionsPage (/activities/:activityId/submissions)
```

---

## 📋 Características Principales

### Autenticación
- Login con usuario/contraseña
- Token almacenado en localStorage
- Redirección automática a login si el token vence
- Logout con limpieza de datos

### Gestión de Cursos
- Ver lista de todos los cursos
- Ver detalles de un curso específico
- Crear nuevos cursos (si tienes permisos)
- Información del profesor

### Gestión de Actividades
- Ver actividades de un curso
- Crear nuevas actividades
- Indicadores de fecha vencida
- Información de peso/calificación

### Gestión de Submisiones
- Ver submisiones de una actividad
- Crear submisiones personales
- Calificar submisiones (modal interactivo)
- Ver feedback de las calificaciones

---

## 🔧 Configuración

### Base URL de la API
Cambiar en `src/services/apiClient.js`:
```javascript
const BASE_URL = 'http://localhost:8080/auth/api';
```

### Permisos (Futuro)
Para agregar validación de permisos específicos, usar:
```javascript
const { checkPermission, hasAnyPermission } = usePermission();

if (checkPermission('ADMIN')) {
  // Mostrar opciones de admin
}
```

---

## 🎯 Hooks Disponibles

### useAuthContext()
```javascript
const { user, isAuthenticated, userId, token, setUser, setIsAuthenticated } = useAuthContext();
```

### usePermission()
```javascript
const { 
  isAuthenticated, 
  isAuthorized,
  checkPermission,
  hasAnyPermission,
  hasAllPermissions 
} = usePermission();
```

---

## 📱 Rutas Disponibles

| Ruta | Componente | Estado |
|------|-----------|--------|
| `/login` | LoginPage | ✅ Pública |
| `/courses` | CoursesPage | 🔐 Protegida |
| `/courses/:courseId` | CourseDetail | 🔐 Protegida |
| `/courses/:courseId/activities` | ActivitiesPage | 🔐 Protegida |
| `/activities/:activityId/submissions` | SubmissionsPage | 🔐 Protegida |

---

## 🎨 Paleta de Colores

- **Primario**: Gradiente Púrpura (#667eea → #764ba2)
- **Éxito**: Gradiente Verde (#43e97b → #38f9d7)
- **Alerta**: Gradiente Rosa (#fa709a → #fee140)
- **Información**: Gradiente Azul (#4facfe → #00f2fe)

---

## 📞 Próximos Pasos Sugeridos

1. **Agregar Validación de Permisos Real**
   - Implementar roles (ADMIN, TEACHER, STUDENT)
   - Validar permisos en cada página

2. **Mejorar Manejo de Errores**
   - Toast notifications para mensajes
   - Retry automático para fallos de red

3. **Agregar Loading States**
   - Skeletons en lugar de "Loading..."
   - Progress bars para operaciones largas

4. **Búsqueda y Filtrado**
   - Buscar cursos por nombre
   - Filtrar actividades por fecha/estado

5. **Paginación**
   - Para listas grandes de cursos/actividades

---

## 🆘 Troubleshooting

**Error 401/403**: Token expirado o sin permisos
- El app automáticamente redirige a login
- Vuelve a hacer login

**No se cargan los datos**: 
- Verifica que la API de `auth` esté corriendo en `http://localhost:8080`
- Revisa la consola del navegador para errores

**Estilos no se aplican**:
- Asegúrate de que `index.css` esté importado en `main.jsx`
- Limpia el caché del navegador

---

## 📝 Notas Técnicas

- **Estado Global**: AuthContext para usuario autenticado
- **Client HTTP**: Interceptor automático de token en headers
- **Gestión de Errores**: Redirección automática en 401/403
- **Responsive**: Media queries para móvil
- **Animaciones**: CSS keyframes para transiciones suaves

---

¡Tu aplicación está lista para usar! 🎉
