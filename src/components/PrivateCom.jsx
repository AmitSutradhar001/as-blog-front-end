import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateCom = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser?.user ? children : <Navigate to="/" replace />;
};

export default PrivateCom;
