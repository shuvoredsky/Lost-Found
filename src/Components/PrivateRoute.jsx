import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (user && user.email) {
    return children;
  }

  return <Navigate to="/sign-in" />;
};

export default PrivetRoute;
