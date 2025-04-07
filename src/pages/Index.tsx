
import { Navigate } from 'react-router-dom';

// Redirect to Dashboard from the index page
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
