import { useState } from "react";

import PlaceHolderImage from "../assets/placeholder.jpg";
import DateTimeSelector from "./DateTimeSelector";
import { useUser } from "../state/UserContext";
import { useModal } from "../state/ModalContext";
import { PopupHeader } from "./PopupHeader";

export function CreateItem({ onItemCreated }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const { user } = useUser();
  const { setModal } = useModal();

  // Methods
  async function onChange(event) {
    // Safeguard
    if (!event.currentTarget.files) return;

    const files = event.currentTarget.files;
    const file = files[0];
    const image = await readFile(file);
    setSelectedImage(image);
  }

  async function readFile(file) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    const result = await new Promise((resolve) => {
      reader.onload = (event) => {
        if (!event.target?.result) return;

        const target = event.target.result;

        return resolve(target);
      };
    });

    return result;
  }

  const handleAddButtonClick = (event) => {
    event.preventDefault();

    if (!selectedDate) {
      alert("Please select end date!");
      return;
    }
    if (selectedDate < new Date()) {
      alert("Please select end time!");
      return;
    }
    if (!selectedImage) {
      alert("Please select an image!");
      return;
    }
    if (!user) {
      alert("Please login!");
      return;
    }
    const data = {
      title,
      description,
      startPrice,
      startDateTime: new Date(),
      endDateTime: selectedDate,
      image_url: selectedImage,
      userID: user.id,
    };
    proceedToUploadItem(data);
  };

  const onSuccess = (data) => {
    alert("Product Added..");
    onItemCreated(data);
    setModal(null);
  };

  const onFailure = (error) => {
    console.error(error);
  };

  const proceedToUploadItem = async (data) => {
    const jwtToken = localStorage.getItem("tredara-token");
    const url = `${import.meta.env.VITE_API_URL}/item/create`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => onSuccess(data))
      .catch((error) => onFailure(error));
  };

  return (
    <div className="modal-container">
      <form className="create-item-box" onSubmit={handleAddButtonClick}>
        <PopupHeader title={"Add Product"} />

        <label htmlFor="productName" className="input-title">
          Title
        </label>
        <input
          className="input-box"
          id="productName"
          placeholder="product name.."
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="productDescription" className="input-title">
          Description
        </label>
        <textarea
          className="input-area"
          id="productDescription"
          placeholder="product description.."
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="price" className="input-title">
          Start Price (SEK)
        </label>
        <input
          type="number"
          id="price"
          className="input-box"
          placeholder="ex. 100"
          value={startPrice}
          onChange={(e) => setStartPrice(e.target.value)}
          required
        />

        <div className="select-time-container">
          <label htmlFor="endTime" className="input-title">
            Bid End Time
          </label>
          <DateTimeSelector
            id="endTime"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        <label htmlFor="img" className="input input-image">
          <span>Image</span>
          <input
            type="file"
            id="img"
            accept="image/png, image/jpeg"
            onChange={(event) => onChange(event)}
          />
          <img
            src={selectedImage || PlaceHolderImage}
            onError={(event) => (event.currentTarget.src = PlaceHolderImage)}
          />
        </label>

        <button className="action-button">Add</button>
      </form>
    </div>
  );
}
