import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const PrivateCom = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  const token = Cookies.get("asblog_token");

  if (!currentUser?.user || !token) {
    toast.info("Cookie has expired! Please log in.");
    setTimeout(() => <Navigate to="/signin" replace />, 3000);
  }

  return children;
};

export default PrivateCom;
