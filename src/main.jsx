import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { UserProvider } from "./state/UserContext";
import "./styles/style.css";
import router from "./router/router";
import { ModalProvider } from "./state/ModalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </UserProvider>
  </React.StrictMode>
);
