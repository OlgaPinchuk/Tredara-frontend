import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { UserProvider } from "./state/UserContext";
import "./styles/style.css";
import { ModalProvider } from "./state/ModalContext";
import { initializeRouter } from "./router/router";

initializeRouter().then((router) => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <UserProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </UserProvider>
    </React.StrictMode>
  );
});
