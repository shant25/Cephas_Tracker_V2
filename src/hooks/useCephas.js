import { useContext } from 'react';
import CephasContext from '../contexts/CephasContext';

/**
 * Custom hook to access the Cephas context
 * @returns {Object} The Cephas context
 */
const useCephas = () => {
  const context = useContext(CephasContext);
  
  if (!context) {
    throw new Error('useCephas must be used within a CephasProvider');
  }
  
  return context;
};

export default useCephas;