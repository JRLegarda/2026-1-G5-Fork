import { useAuthContext } from "./useAuthContext";

/**
 * Hook to check if the user has specific permissions
 * Returns user authentication status and permission details
 */
export const usePermission = () => {
  const { isAuthenticated, user } = useAuthContext();

  const checkPermission = (permission) => {
    if (!isAuthenticated) return false;
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => checkPermission(permission));
  };

  const hasAllPermissions = (permissions) => {
    return permissions.every(permission => checkPermission(permission));
  };

  return {
    isAuthenticated,
    isAuthorized: isAuthenticated,
    user,
    checkPermission,
    hasAnyPermission,
    hasAllPermissions,
    permissions: user?.permissions || []
  };
};
