import { useState } from "react";

import { InputField } from "./InputField";

export default function Search({ onSearch }) {
  // State
  const [query, setQuery] = useState({});

  // Const
  const searchFiled = {
    key: "search",
    autoFocus: true,
    label: "Search",
    placeholder: "Search item",
    required: false,
    type: "search",
  };

  // Methods
  async function onSubmit(event) {
    event.preventDefault();

    try {
      const jwtToken = localStorage.getItem("tredara-token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items/search?query=${query.search}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const queryIsValid = data.length > 0;

      onSearch(data, queryIsValid);
    } catch (error) {
      console.error("Error searching for items:", error);
    }
  }

  function handleInput(event) {
    const inputValue = event.target.value;
    setQuery(inputValue);

    if (inputValue.trim() === "") {
      onSearch([], true);
    }
  }

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <InputField
        field={searchFiled}
        state={[query, setQuery]}
        onInput={handleInput}
      />
      <button className="search-button">Search</button>
    </form>
  );
}
