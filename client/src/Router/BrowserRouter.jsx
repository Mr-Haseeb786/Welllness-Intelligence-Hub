import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import FinanceTracker from "../Pages/FinanceTracker";
import RouteChecker from "./RouteChecker";
import PublicRoutes from "./PublicRoutes";
import InputForm from "../Pages/InputForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteChecker children={<FinanceTracker />} />,
  },
  {
    path: "/signup",
    element: <PublicRoutes children={<SignUpPage />} />,
  },
  {
    path: "/signin",
    element: <PublicRoutes children={<LoginPage />} />,
  },
  {
    path: "/finance-tracker/edit-info",
    element: <RouteChecker children={<InputForm />} />,
  },
]);
