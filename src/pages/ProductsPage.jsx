import { CreateItem } from "../components/CreateItem";
import { useUser } from "../state/UserContext";
import { useModal } from "../state/ModalContext";
import { AddBid } from "../components/AddBid";
import { ShowBids } from "../components/ShowBids";

import ProductList from "../components/ProductList";
import Hero from "../components/Hero";
import Search from "../components/Search";

export function ProductsPage() {
  // Global state
  const { user } = useUser();
  const { setModal } = useModal();

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
          <div>
            <button
              className="action-button medium-button"
              onClick={() => setModal(<CreateItem />)}
            >
              Add Product
            </button>
            <button
              className="action-button medium-button"
              onClick={() => setModal(<AddBid itemId={7} />)}
            >
              Add Bid
            </button>
            <button
              className="action-button medium-button"
              onClick={() => setModal(<ShowBids itemId={7} />)}
            >
              Show Bids
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
