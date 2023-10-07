import React, { useState, useEffect } from "react";
import PlaceHolderImage from "../assets/placeholder.jpg";

export function ShowItem({ match }) {
  const [item, setItem] = useState(null);

  // Function to fetch item details
  const fetchItemDetails = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/item/${match.params.id}`; // Change the API endpoint here

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
    // Fetch item details from the API based on the ID from match.params.id when the component mounts
    fetchItemDetails();
  }, [match.params.id]);

  // Function to render item details
  const renderItemDetails = () => {
    if (!item) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container">
        <div className="item-details-container">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Start Price (SEK): {item.startPrice}</p>
          {/* Add more item details as needed */}
        </div>
        <div className="item-image-container">
          <img src={item.imageUrl || PlaceHolderImage} alt="Product Image" />
        </div>
      </div>
    );
  };

  return renderItemDetails();
}
