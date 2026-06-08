import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [],
  },
  {
    path: "/login",
    element: <Login />,
    children: [],
  },
]);
export default router;
