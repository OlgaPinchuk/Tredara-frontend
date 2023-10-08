import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Add this import
import PlaceHolderImage from "../assets/placeholder.jpg";

export function ProductDetailsPage() {
  const { productId } = useParams(); // Get the productId from the URL params
  const [item, setItem] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

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

  useEffect(() => {
    // Calculate time remaining when item data is available
    if (item) {
      const endDateTime = new Date(item.endDateTime);
      const currentTime = new Date();
      const timeDifference = endDateTime - currentTime;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );

      setTimeRemaining({ days, hours, minutes });
    }
  }, [item]);

  // Function to render item details
  const renderItemDetails = () => {
    if (!item || !timeRemaining) {
      return <div>Loading...</div>;
    }

    return (
      <div className="product-detail">
        <div className="product-image">
          <img src={item.image_url || PlaceHolderImage} alt="Product Image" />
        </div>
        <div className="product-info">
          <h1>{item.title}</h1>
          <p>Description: {item.description}</p>
          <p>Leading Bid (SEK): {item.startPrice}</p>
          <p>
            Ends in: {timeRemaining.days} days, {timeRemaining.hours} hours,{" "}
            {timeRemaining.minutes} minutes
          </p>
          <button id="b">Place Bid</button>
        </div>
      </div>
    );
  };

  return renderItemDetails();
}
