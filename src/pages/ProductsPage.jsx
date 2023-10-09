import { useState } from "react";

import { CreateItem } from "../components/CreateItem";
import { useUser } from "../state/UserContext";
import ProductList from "../components/ProductList";
import Hero from "../components/Hero";
import Search from "../components/Search";

export function ProductsPage() {
  // Global state
  const { user } = useUser();

  // Local state
  const [createItemVisible, setCreateItemVisible] = useState(false);

  // Constants
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const latestItemsEndpoint = `${baseUrl}/latestItems`;
  const itemsEndingSoonEndpoint = `${baseUrl}/endingSoonItems`;

  const LatestItems = (
    <ProductList endpoint={latestItemsEndpoint} title="Latest Items" />
  );

  const EndingSoonItems = (
    <ProductList endpoint={itemsEndingSoonEndpoint} title="Ending Soon Items" />
  );
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
        {LatestItems}
        {EndingSoonItems}
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
