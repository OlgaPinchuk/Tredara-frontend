import { Outlet } from "react-router-dom";

import { NavigationBar, Footer } from "./components";
import ItemsEndingSoon from "./components/ItemsEndingSoon";
import LatestItems from "./components/LatestItems";
import { ShowItem } from "./components/ShowItem";

export default function App() {
  const customMatch = {
    params: {
      id: "1", // You can set it to any desired value
    },
  };
  return (
    <section className="App">
      <NavigationBar />
      <Outlet />
      <LatestItems />
      <ItemsEndingSoon />
      <ShowItem match={customMatch} />
      <Footer />
    </section>
  );
}
