import React, { useEffect, useState } from "react";

import { Item } from "./Item";

function ProductList({ endpoint, title }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => onSuccess(data))
      .catch((error) => onFailure(error));
  }, [endpoint]);

  function onSuccess(data) {
    setProducts(data);
  }

  function onFailure(error) {
    console.error(error);
  }

  if (products.length == 0)
    return (
      <h2 className="list-header">
        {title}: <i>No data available</i>
      </h2>
    );

  const Products = products.map((item) => <Item item={item} key={item.id} />);

  return (
    <div className="products-list">
      <h2 className="list-header">{title}</h2>
      <div className="items-container grid-cards">{Products}</div>
    </div>
  );
}

export default React.memo(ProductList);
