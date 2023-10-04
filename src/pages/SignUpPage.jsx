import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import fields from "../data/fields-sign-up.json";
import { useUser } from "../state/UserContext";

export function SignUpPage() {
  // Local state
  const [form, setForm] = useState({});

  // Global state
  const { setUser } = useUser();
  const navigate = useNavigate();

  const Inputs = fields.map((item, index) => (
    <InputField field={item} key={index} state={[form, setForm]} />
  ));

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        const result = await response.json();
        onSuccess(result);
      } else {
        const errorText = await response.text();
        const errorData = JSON.parse(errorText);

        onFailure(errorData.info);
      }
    } catch (error) {
      onFailure(error);
    }
  }

  function onSuccess(newUser) {
    alert("Welcome to Tredara!");
    setUser(newUser);
    navigate("/");
  }

  function onFailure(error) {
    console.error(error);
    alert(`Can't create an account because of ${error}`);
  }

  return (
    <article className="page auth-page sign-up-page">
      <div className="container">
        <h2>Become a Member</h2>
        <form className="auth-form flex-column" onSubmit={onSubmit}>
          {Inputs}
          <button>Register</button>
        </form>
        <footer>
          <p>
            Already have an account? <Link to="/login">Sign in instead</Link>
          </p>
        </footer>
      </div>
    </article>
  );
}
