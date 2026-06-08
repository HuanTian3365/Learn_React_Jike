import { createRoot } from "react-dom/client";
import "./index.scss";

import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
