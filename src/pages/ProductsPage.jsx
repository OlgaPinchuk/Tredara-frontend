import { useState } from "react";
import { CreateItem } from "../components/CreateItem";
import { useUser } from "../state/UserContext";
import Hero from "../components/Hero";
import Search from "../components/Search";

export function ProductsPage() {
  const { user } = useUser();

  const [createItemVisible, setCreateItemVisible] = useState(false);

  // Methods

  function onSearch(items) {
    return []; // TODO: implement with state
  }

  return (
    <article className="page products-page">
      <Hero>
        <Search onSearch={onSearch} />
      </Hero>
      <div className="container">
        <h2>Products page</h2>
        {user && (
          <button
            className="action-button medium-button"
            onClick={() => setCreateItemVisible(true)}
          >
            Add Product
          </button>
        )}
        {user && createItemVisible && (
          <CreateItem setCreateItemVisible={setCreateItemVisible} />
        )}
      </div>
    </article>
  );
}
