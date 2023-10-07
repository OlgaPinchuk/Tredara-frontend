import { Outlet } from "react-router-dom";

import { NavigationBar, Footer } from "./components";
import ItemsEndingSoon  from "./components/ItemsEndingSoon";
import LatestItems from "./components/LatestItems";

export default function App() {
  return (
    <section className="App">
      <NavigationBar />
      <Outlet />
      <LatestItems/>
      <ItemsEndingSoon/>
      <Footer />
    </section>
  );
}
