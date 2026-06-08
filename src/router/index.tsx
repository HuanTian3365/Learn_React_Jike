import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import GeekLayout from "@/pages/Layout";
import AuthRouter from "@/components/AuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRouter>
        <GeekLayout />
      </AuthRouter>
    ),
    children: [],
  },
  {
    path: "/login",
    element: <Login />,
    children: [],
  },
]);
export default router;
