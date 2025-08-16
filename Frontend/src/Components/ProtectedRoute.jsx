import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user  = useSelector((state) => state.user); // Redux madhun user ghetoy

  if (!user) {
    // user login nahi asel tar Login page la pathav
    return <Navigate to="/login" replace />;
  }

  return children; // login asel tar original component render hoil
};

export default ProtectedRoute;
