import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OnlyAdminPrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser?.user && currentUser.user.isAdmin ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default OnlyAdminPrivateRoute;
