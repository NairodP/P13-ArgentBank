import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function AuthRoot({ children }) {
  const { userToken } = useSelector((state) => state.auth);

  if (userToken) {
    return children;
  }
  return <Navigate to="/login" />;
}
