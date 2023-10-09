import { Outlet } from "react-router-dom";

import { NavigationBar, Footer } from "./components";

export default function App() {
  return (
    <section className="App">
      <NavigationBar />
      <Outlet />
      <Footer />
    </section>
  );
}
