import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * Stops unautherized access to restricted pages.
 * 
 * @param {*} param0 
 * @returns 
 */
function RequireAdmin({ children }) {
    const { currentUser } = useAuth();
    const adminID = ["35SW0PERUwfLt09pU9mHlT0WMEB2", "Pw2c2kzWeUOZyMzbhsumsS8sbTz2"];
  
    if (!currentUser || !adminID.includes(currentUser.uid)) {
      // TODO: not auth message
      return <Navigate to="/" />;
    }
  
    return children;
  }

export default RequireAdmin;