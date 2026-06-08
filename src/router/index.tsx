import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import GeekLayout from "@/pages/Layout";
import AuthRouter from "@/components/AuthRoute";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRouter>
        <GeekLayout />
      </AuthRouter>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/article",
        element: <Article />,
      },
      {
        path: "/publish",
        element: <Publish />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    children: [],
  },
]);
export default router;
