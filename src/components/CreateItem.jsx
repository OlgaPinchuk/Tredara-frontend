import { useState } from "react";
import PlaceHolderImage from "../assets/placeholder.jpg";
import DateTimeSelector from "./DateTimeSelector";

export function CreateItem() {
  const [selectedImage, setSelectedImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [startPrice, setStartPrice] = useState();
  const [selectedDate, setSelectedDate] = useState(null);

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

  const handleAddButtonClick = () => {
    if (!title) {
      alert("Please enter title!");
      return;
    }
    if (!description) {
      alert("Please enter description!");
      return;
    }
    if (!startPrice) {
      alert("Please enter starting price!");
      return;
    }
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
    const data = {
      title: title,
      description: description,
      starting_price: startPrice,
      end_time: selectedDate,
      image: selectedImage,
    };
    console.log("item is : " + JSON.stringify(data));
    proceedToUploadItem(data);
  };

  const proceedToUploadItem = async (data) => {
    const url = `${process.env.REACT_APP_API_URL}item/`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((resp) => onSuccess(resp));
      })
      .catch((error) => onFailure(error));
  };

  return (
    <div className="container">
      <div className="create-item-container">
        <div className="create-item-box">
          <h2>Add Product</h2>

          <label className="input-title">Title</label>
          <input
            className="input-box"
            placeholder="product name.."
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="input-title">Description</label>
          <textarea
            className="input-area"
            placeholder="product description.."
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="input-title">Start Price (SEK)</label>
          <input
            type="number"
            className="input-box"
            placeholder="ex. 100"
            value={startPrice}
            onChange={(e) => setStartPrice(e.target.value)}
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

          <button className="bottom-button" onClick={handleAddButtonClick}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
