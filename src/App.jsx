import { Outlet } from "react-router-dom";

import { NavigationBar, Footer } from "./components";
import Modal from "./components/Modal";

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
