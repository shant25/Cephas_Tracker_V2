/**
 * Access control utility functions for the Cephas Admin Portal
 */

// Role hierarchy (higher roles have more permissions)
const ROLE_HIERARCHY = {
  'super_admin': 50,
  'supervisor': 40,
  'accountant': 30,
  'warehouse': 20,
  'installer': 10
};

// Module access permissions
const MODULE_PERMISSIONS = {
  'dashboard': ['super_admin', 'supervisor', 'accountant', 'warehouse', 'installer'],
  'building': ['super_admin', 'supervisor'],
  'splitter': ['super_admin', 'supervisor'],
  'material': ['super_admin', 'supervisor', 'warehouse', 'installer'],
  'service_installer': ['super_admin', 'supervisor'],
  'order': ['super_admin', 'supervisor', 'installer'],
  'invoice': ['super_admin', 'accountant', 'installer'],
  'report': ['super_admin', 'supervisor', 'accountant'],
  'import': ['super_admin'],
  'export': ['super_admin', 'accountant'],
  'search': ['super_admin', 'supervisor', 'accountant', 'warehouse', 'installer']
};

// Action permissions
const ACTION_PERMISSIONS = {
  // Create permissions
  'create_building': ['super_admin'],
  'create_splitter': ['super_admin'],
  'create_material': ['super_admin', 'warehouse'],
  'create_service_installer': ['super_admin'],
  'create_order': ['super_admin', 'supervisor'],
  'create_invoice': ['super_admin', 'accountant'],
  'create_activation': ['super_admin', 'supervisor'],
  'create_assurance': ['super_admin', 'supervisor'],
  
  // Edit permissions
  'edit_building': ['super_admin', 'supervisor'],
  'edit_splitter': ['super_admin', 'supervisor'],
  'edit_material': ['super_admin', 'warehouse'],
  'edit_service_installer': ['super_admin'],
  'edit_order': ['super_admin', 'supervisor'],
  'edit_invoice': ['super_admin', 'accountant'],
  'edit_activation': ['super_admin', 'supervisor'],
  'edit_assurance': ['super_admin', 'supervisor'],
  
  // Delete permissions
  'delete_building': ['super_admin'],
  'delete_splitter': ['super_admin'],
  'delete_material': ['super_admin'],
  'delete_service_installer': ['super_admin'],
  'delete_order': ['super_admin'],
  'delete_invoice': ['super_admin'],
  'delete_activation': ['super_admin'],
  'delete_assurance': ['super_admin'],
  
  // View permissions (not needed if they have create/edit)
  'view_building': ['super_admin', 'supervisor'],
  'view_splitter': ['super_admin', 'supervisor'],
  'view_material': ['super_admin', 'supervisor', 'warehouse', 'installer'],
  'view_service_installer': ['super_admin', 'supervisor'],
  'view_order': ['super_admin', 'supervisor', 'installer'],
  'view_invoice': ['super_admin', 'accountant', 'installer'],
  'view_report': ['super_admin', 'supervisor', 'accountant'],
  'view_activation': ['super_admin', 'supervisor', 'installer'],
  'view_assurance': ['super_admin', 'supervisor', 'installer'],
  
  // Special permissions
  'assign_material': ['super_admin', 'supervisor', 'warehouse'],
  'assign_job': ['super_admin', 'supervisor'],
  'complete_job': ['super_admin', 'supervisor', 'installer'],
  'approve_report_access': ['super_admin'],
  'import_data': ['super_admin'],
  'export_data': ['super_admin', 'accountant'],
  'change_status': ['super_admin', 'supervisor', 'installer'],
  'update_stock': ['super_admin', 'warehouse']
};

/**
 * Check if a user has permission to access a module
 * @param {string} userRole - The user's role
 * @param {string} module - The module to check access for
 * @returns {boolean} - Whether the user has access
 */
export const hasModuleAccess = (userRole, module) => {
  if (!userRole || !module) return false;
  return MODULE_PERMISSIONS[module]?.includes(userRole) || false;
};

/**
 * Check if a user has permission to perform an action
 * @param {string} userRole - The user's role
 * @param {string} action - The action to check permission for
 * @returns {boolean} - Whether the user has permission
 */
export const hasActionPermission = (userRole, action) => {
  if (!userRole || !action) return false;
  return ACTION_PERMISSIONS[action]?.includes(userRole) || false;
};

/**
 * Check if a user is authorized based on allowed roles
 * @param {string} userRole - The user's role
 * @param {string[]} allowedRoles - Array of roles that are allowed
 * @returns {boolean} - Whether the user is authorized
 */
export const isUserAuthorized = (userRole, allowedRoles) => {
  if (!userRole || !allowedRoles || !Array.isArray(allowedRoles)) return false;
  return allowedRoles.includes(userRole);
};

/**
 * Check if a user role is at least at the specified level in the hierarchy
 * @param {string} userRole - The user's role
 * @param {string} requiredRole - The minimum required role
 * @returns {boolean} - Whether the user has sufficient role level
 */
export const hasMinimumRole = (userRole, requiredRole) => {
  if (!userRole || !requiredRole) return false;
  const userLevel = ROLE_HIERARCHY[userRole] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;
  return userLevel >= requiredLevel;
};

/**
 * Get all possible actions a user can perform
 * @param {string} userRole - The user's role
 * @returns {string[]} - Array of permitted actions
 */
export const getUserPermissions = (userRole) => {
  if (!userRole) return [];
  
  return Object.entries(ACTION_PERMISSIONS)
    .filter(([action, roles]) => roles.includes(userRole))
    .map(([action]) => action);
};

export default {
  hasModuleAccess,
  hasActionPermission,
  isUserAuthorized,
  hasMinimumRole,
  getUserPermissions
};