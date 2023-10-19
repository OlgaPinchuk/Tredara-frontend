import { useEffect, useState } from "react";
import { PopupHeader } from "./PopupHeader";
import { BidRow } from "./BidRow";
import BidHistoryHeader from "../data/bid-history-header.json";

export function ShowBids({ itemId }) {
  const [bids, setBids] = useState();

  useEffect(() => {
    getBidsForItem();
  }, []);

  // Methods
  const getBidsForItem = async () => {
    const jwtToken = localStorage.getItem("tredara-token");
    const url = `${import.meta.env.VITE_API_URL}/bid/${itemId}`;

    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          response.json().then((resp) => onSuccess(resp));
        } else {
          onFailure(await response.text());
        }
      })
      .catch((error) => onFailure(error));
  };

  const onSuccess = (resp) => {
    setBids(resp);
  };

  const onFailure = (error) => {
    alert(error);
    console.error(error);
  };

  return (
    <div className="container">
      <div className="modal-container">
        <div className="bid-history-box">
          <PopupHeader title={"Bid History"} />
          <div className="bold-text">
            <BidRow bid={BidHistoryHeader} />
          </div>
          {bids ? (
            bids.map((bid) => <BidRow key={bid.id} bid={bid} />)
          ) : (
            <p>loading..</p>
          )}
        </div>
      </div>
    </div>
  );
}
