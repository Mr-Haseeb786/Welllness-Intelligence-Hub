import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/", { replace: true });
      return;
    }
  }, [isSignedIn, navigate]);

  return children;
};

export default PublicRoutes;
