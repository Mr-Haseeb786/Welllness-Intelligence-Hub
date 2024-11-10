import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/BrowserRouter.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
