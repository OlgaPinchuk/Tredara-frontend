import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useUser } from "../state/UserContext";
import { useModal } from "../state/ModalContext";
import useFetch from "../hooks/useFetch";

import ProductList from "../components/ProductList";
import { CreateItem } from "../components/CreateItem";
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

  const {
    data: latestItems,
    loading: latestItemsLoading,
    error: latestItemsError,
  } = useFetch(latestItemsEndpoint);

  const {
    data: endingSoonItems,
    loading: endingSoonItemsLoading,
    error: endingSoonItemsError,
  } = useFetch(itemsEndingSoonEndpoint);

  // Local state
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [queryValid, setQueryValid] = useState(true);

  function onSearch(items, isValidQuery) {
    setSearchItems(items);
    setQueryValid(isValidQuery);
  }

  useEffect(() => {
    setItems(latestItems);
  }, [latestItems, endingSoonItems]);

  function onItemCreated(newItem) {
    setItems((prevItems) => [newItem, ...prevItems]);
  }

  const displayItems = !queryValid ? (
    <p>No items found.</p>
  ) : searchItems.length > 0 ? (
    <ProductList items={searchItems} title="Search Results" />
  ) : (
    <>
      {latestItemsLoading ? (
        <p>Loading Latest Items...</p>
      ) : latestItemsError ? (
        <p>Error loading Latest Items: {latestItemsError.message}</p>
      ) : (
        <ProductList items={items} title="Latest Items" />
      )}
      {endingSoonItemsLoading ? (
        <p>Loading Ending Soon Items...</p>
      ) : endingSoonItemsError ? (
        <p>Error loading Ending Soon Items: {endingSoonItemsError.message}</p>
      ) : (
        <ProductList items={endingSoonItems} title="Ending Soon Items" />
      )}
    </>
  );

  return (
    <article className="page products-page">
      <Hero>
        <Search onSearch={onSearch} />
      </Hero>

      <div className="container">
        {user && (
          <div>
            <button
              className="action-button medium-button"
              onClick={() =>
                setModal(<CreateItem onItemCreated={onItemCreated} />)
              }
            >
              Add Product
            </button>
            <Link to={`/history`} className="item-link">
              <button className="action-button medium-button">History</button>
            </Link>
          </div>
        )}
        {displayItems}
      </div>
    </article>
  );
}
