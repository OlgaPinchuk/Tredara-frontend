import { useState } from "react";

import { CreateItem } from "../components/CreateItem";
import { useUser } from "../state/UserContext";
import ProductList from "../components/ProductList";

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

  return (
    <article className="page products-page">
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
