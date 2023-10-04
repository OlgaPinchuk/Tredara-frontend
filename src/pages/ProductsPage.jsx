import { useState } from "react";
import { CreateItem } from "../components/CreateItem";
import { useUser } from "../state/UserContext";

export function ProductsPage() {
  const { user } = useUser();

  const [createItemVisible, setCreateItemVisible] = useState(false);

  return (
    <article className="page products-page">
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
