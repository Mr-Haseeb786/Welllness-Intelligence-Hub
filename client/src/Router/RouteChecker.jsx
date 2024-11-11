import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RouteChecker = ({ children }) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isSignedIn) {
  //     navigate("/signin", { replace: true });
  //   }
  // }, [navigate, isSignedIn]);

  return children;
};

export default RouteChecker;
