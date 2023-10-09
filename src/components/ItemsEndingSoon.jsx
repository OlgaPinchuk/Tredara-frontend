import { useEffect, useState } from "react";
import Post from "./Item";
import "../styles/components/item.css";

export default function ItemsEndingSoon() {
  const [endingItems, setEndingItems] = useState([]);

  const endpoint = "http://localhost:8080/api/v1/endingSoonItems";

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((result) => onSuccess(result))
      .catch((error) => onFailure(error));
  }, []);

  function onSuccess(result) {
    setEndingItems(result);
  }

  function onFailure(error) {
    alert("Sorry we could not load the data" + error);
  }

  const Items = endingItems.map((item) => <Post item={item} key={item.id} />);

  return (
    <div className="items">
      <div className="item-icon">
        <h3 className="items-header">Ending Soon Items</h3>
      </div>
      <div className="items-container">{Items}</div>
    </div>
  );
}
