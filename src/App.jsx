import { Outlet } from "react-router-dom";

import { NavigationBar, Footer } from "./components";
import Posts  from "./components/Items";

export default function App() {
  return (
    <section className="App">
      <NavigationBar />
      <Outlet />
      <Posts/>
      <Footer />
    </section>
  );
}
