import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Add this import
import PlaceHolderImage from "../assets/placeholder.jpg";

export function ProductDetailsPage() {
  const { productId } = useParams(); // Get the productId from the URL params
  const [item, setItem] = useState(null);

  // Function to fetch item details
  const fetchItemDetails = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/item/${productId}`; // Use the productId from URL

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch item details");
      }
      const data = await response.json();
      setItem(data); // Set the item data in state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch item details from the API based on the productId when the component mounts
    fetchItemDetails();
  }, [productId]); // Add productId to the dependency array

  // Function to render item details
  const renderItemDetails = () => {
    if (!item) {
      return <div>Loading...</div>;
    }

    return (
      <div className="product-detail">
        <div className="product-image">
          <img src={item.imageUrl || PlaceHolderImage} alt="Product Image" />
        </div>
        <div className="product-info">
          <h1>{item.title}</h1>
          <p>Description: {item.description}</p>
          <p>Leading Bid (SEK): {item.startPrice}</p>
          <p> Ends in: {item.timeToBidEnd}</p>
          <p> Bids(Show):{item.numberOfBids} Bids</p>
          <button className="button">Place Bid</button>
        </div>
      </div>
    );
  };

  return renderItemDetails();
}
