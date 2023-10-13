import { useState } from "react";
import { useUser } from "../state/UserContext";
import { PopupHeader } from "./PopupHeader";
import { useModal } from "../state/ModalContext";

export function AddBid({ itemId, onAdd }) {
  const [amount, setAmount] = useState("");

  const { user } = useUser();
  const { setModal } = useModal();

  // Methods
  const handleAddButtonClick = (event) => {
    event.preventDefault();

    if (!user) {
      alert("Please login!");
      return;
    }
    const data = { amount, itemId };
    proceedToAddBid(data);
  };

  const proceedToAddBid = async (data) => {
    const url = `${import.meta.env.VITE_API_URL}/bid`;

    fetch(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          response.json().then((data) => onSuccess(data.amount));
        } else {
          onFailure(await response.text());
        }
      })
      .catch((error) => onFailure(error));
  };

  const onSuccess = (amount) => {
    onAdd(amount);
    alert("Bid Added..");
    setModal(null);
  };

  const onFailure = (error) => {
    alert(error);
    console.error(error);
  };

  return (
    <div className="container">
      <div className="modal-container">
        <form className="add-bid-box" onSubmit={handleAddButtonClick}>
          <PopupHeader title={"Place Bid"} />

          <label className="input-title">Enter your bid amount (SEK)</label>
          <input
            type="number"
            className="input-box"
            placeholder="ex. 100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <button className="action-button">Place Bid</button>
        </form>
      </div>
    </div>
  );
}
