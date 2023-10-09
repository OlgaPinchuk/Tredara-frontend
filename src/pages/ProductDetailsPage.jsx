import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PlaceHolderImage from "../assets/placeholder.jpg";

export function ProductDetailsPage() {
  const { productId } = useParams();

  const [item, setItem] = useState(null);

  const fetchItemDetails = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/item/${productId}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch item details");
      }
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItemDetails();
  }, [productId]);

  const renderItemDetails = () => {
    if (!item) {
      return <div>Loading...</div>;
    }

    return (
      <div className="product-details">
        <div className="product-image">
          <img src={item.imageUrl || PlaceHolderImage} alt="Product Image" />
        </div>
        <div className="product-info">
          <h2>{item.title}</h2>
          <p>Leading bid: {item.startPrice} SEK</p>
          <p> Ends in: {item.timeToBidEnd}</p>
          <p> Bids number: {item.numberOfBids}</p>
          <p>Description: {item.description}</p>

          <button className="button place-bid-btn">Place Bid</button>
        </div>
      </div>
    );
  };

  return renderItemDetails();
}
