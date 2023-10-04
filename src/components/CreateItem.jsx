import { useState } from "react";
import PlaceHolderImage from "../assets/placeholder.jpg";
import DateTimeSelector from "./DateTimeSelector";
import { useUser } from "../state/UserContext";
import { PopupHeader } from "./PopupHeader";

export function CreateItem({ setCreateItemVisible }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const { user } = useUser();

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
      title: title,
      description: description,
      startPrice: startPrice,
      startDateTime: new Date(),
      endDateTime: selectedDate,
      imageString: selectedImage,
      userID: user.id,
    };
    proceedToUploadItem(data);
  };

  const proceedToUploadItem = async (data) => {
    const url = `${import.meta.env.VITE_API_URL}/item/create`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((resp) => onSuccess(resp));
      })
      .catch((error) => onFailure(error));
  };

  const onSuccess = (resp) => {
    alert("Product Added..");
  };

  const onFailure = (error) => {
    console.error(error);
  };

  return (
    <div className="container">
      <div className="create-item-container">
        <form className="create-item-box" onSubmit={handleAddButtonClick}>
          <PopupHeader
            setVisiblility={setCreateItemVisible}
            title={"Add Product"}
          />

          <label className="input-title">Title</label>
          <input
            className="input-box"
            placeholder="product name.."
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="input-title">Description</label>
          <textarea
            className="input-area"
            placeholder="product description.."
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="input-title">Start Price (SEK)</label>
          <input
            type="number"
            className="input-box"
            placeholder="ex. 100"
            value={startPrice}
            onChange={(e) => setStartPrice(e.target.value)}
            required
          />

          <div className="select-time-container">
            <label className="input-title">Bid End Time</label>
            <DateTimeSelector
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>

          <label className="input input-image">
            <span>Image</span>
            <input
              type="file"
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
    </div>
  );
}
