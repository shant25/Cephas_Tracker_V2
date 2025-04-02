import api from './api';

/**
 * Authentication service for handling user authentication
 */
const AuthService = {
  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - Promise that resolves to user data or rejects with error
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.success) {
        // Store token and user data in localStorage
        localStorage.setItem('cephasToken', response.token);
        localStorage.setItem('cephasUser', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Authentication failed' };
    }
  },
  
  /**
   * Logout user
   */
  logout: () => {
    // Remove token and user data from localStorage
    localStorage.removeItem('cephasToken');
    localStorage.removeItem('cephasUser');
    
    // Redirect to login page
    window.location.href = '/login';
  },
  
  /**
   * Check if user is authenticated
   * @returns {boolean} - Whether user is authenticated
   */
  isAuthenticated: () => {
    const token = localStorage.getItem('cephasToken');
    return !!token;
  },
  
  /**
   * Get current user data
   * @returns {object|null} - User data or null if not authenticated
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('cephasUser');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  /**
   * Get user role
   * @returns {string|null} - User role or null if not authenticated
   */
  getUserRole: () => {
    const user = AuthService.getCurrentUser();
    return user ? user.role : null;
  },
  
  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise} - Promise that resolves to success message or rejects with error
   */
  requestPasswordReset: async (email) => {
    try {
      return await api.post('/auth/forgot-password', { email });
    } catch (error) {
      console.error('Password reset request error:', error);
      return { success: false, message: 'Failed to request password reset' };
    }
  },
  
  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} password - New password
   * @returns {Promise} - Promise that resolves to success message or rejects with error
   */
  resetPassword: async (token, password) => {
    try {
      return await api.post('/auth/reset-password', { token, password });
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, message: 'Failed to reset password' };
    }
  },
  
  /**
   * Validate reset token
   * @param {string} token - Reset token
   * @returns {Promise} - Promise that resolves to token validity or rejects with error
   */
  validateResetToken: async (token) => {
    try {
      return await api.post('/auth/validate-token', { token });
    } catch (error) {
      console.error('Token validation error:', error);
      return { success: false, message: 'Invalid or expired token' };
    }
  }
};

export default AuthService;