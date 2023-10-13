import { Outlet } from "react-router-dom";

import { NavigationBar, Footer } from "./components";
import Modal from "./components/Modal";
import { useEffect } from "react";

export default function App() {
  return (
    <section className="App">
      <NavigationBar />
      <Outlet />
      <Footer />
      <Modal />
    </section>
  );
}
