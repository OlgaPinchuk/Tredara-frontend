import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PlaceHolderImage from "../assets/placeholder.jpg";
import { useModal } from "../state/ModalContext";
import { AddBid } from "../components/AddBid";
import { ShowBids } from "../components/ShowBids";
import { useUser } from "../state/UserContext";

export function ProductDetailsPage() {
  const { setModal } = useModal();
  const { user } = useUser();

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

  function onAddBid(newPrice) {
    setItem((prevItem) => ({
      ...prevItem,
      leadPrice: newPrice,
      numberOfBids: prevItem.numberOfBids + 1,
    }));
  }

  const renderItemDetails = () => {
    if (!item) {
      return <div>Loading...</div>;
    }

    const {
      title,
      imageUrl,
      description,
      startPrice,
      timeToBidEnd,
      leadPrice,
    } = item;

    return (
      <div className="product-details">
        <div className="product-image">
          <img src={imageUrl || PlaceHolderImage} alt="Product Image" />
        </div>
        <div className="product-info">
          <h2>{title}</h2>
          <p>
            <b>Start Price:</b> SEK {startPrice}
          </p>
          <p>
            <b>Leading Bid:</b>{" "}
            {typeof parseFloat(leadPrice) !== "number" ? "" : "SEK "}
            {leadPrice}
          </p>
          <p>
            <b>Ends in:</b> {timeToBidEnd}
          </p>
          <p>
            <b>
              Bids (
              <span
                className="underlined-text"
                onClick={() => setModal(<ShowBids itemId={productId} />)}
              >
                Show
              </span>
              ):
            </b>{" "}
            {item.numberOfBids} Bids
          </p>
          <p>
            <b>Description:</b> {description}
          </p>
          {user && (
            <button
              className="button place-bid-btn"
              onClick={() =>
                setModal(<AddBid itemId={productId} onAdd={onAddBid} />)
              }
            >
              Place Bid
            </button>
          )}
        </div>
      </div>
    );
  };

  return renderItemDetails();
}
