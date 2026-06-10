import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import GeekLayout from "@/pages/Layout";
import AuthRouter from "@/components/AuthRoute";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("@/pages/Home"));
const Article = lazy(() => import("@/pages/Article"));
const Publish = lazy(() => import("@/pages/Publish"));

const router = createBrowserRouter(
  [
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
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/article",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Article />
            </Suspense>
          ),
        },
        {
          path: "/publish",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Publish />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      children: [],
    },
  ],
  {
    basename: "/Learn_React_Jike",
  },
);
export default router;
