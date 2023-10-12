import { useState } from "react";

import ProductList from "../components/ProductList";
import Hero from "../components/Hero";
import useFetch from "../hooks/useFetch";
import { useUser } from "../state/UserContext";

export function HistoryPage() {
  const { user } = useUser();

  // Constants
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const userCreatedItems = `${baseUrl}/items/createdByUser/${user.id}`;
  const userBiddedItems = `${baseUrl}/items/bidedByUser/${user.id}`;
  const userWonBidsItems = `${baseUrl}/items/wonByUser/${user.id}`;

  // Local state
  const [endPoint, setEndPoint] = useState(userCreatedItems);

  const { data: items, loading: loading, error: error } = useFetch(endPoint);

  const displayItems = loading ? (
    <p>loading..</p>
  ) : error ? (
    <p>error loading items..</p>
  ) : items && items.length > 0 ? (
    <ProductList items={items} title="" />
  ) : (
    <p>No items found.</p>
  );

  return (
    <article className="page products-page">
      <Hero>
        <div className="history-header">
          <a
            className={endPoint == userCreatedItems && "underlined-text"}
            onClick={() => setEndPoint(userCreatedItems)}
          >
            My Items
          </a>
          <a
            className={endPoint == userBiddedItems && "underlined-text"}
            onClick={() => setEndPoint(userBiddedItems)}
          >
            My Bids
          </a>
          <a
            className={endPoint == userWonBidsItems && "underlined-text"}
            onClick={() => setEndPoint(userWonBidsItems)}
          >
            Won Bids
          </a>
        </div>
      </Hero>
      <div className="container">{displayItems}</div>
    </article>
  );
}
