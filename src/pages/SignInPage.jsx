import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { InputField } from "../components";
import fields from "../data/fields-sign-in.json";
import { useUser } from "../state/UserContext";

export function SignInPage() {
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login/`, {
        method: "POST",
        credentials: "include",
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

        onFailure(errorText);
      }
    } catch (error) {
      onFailure(error);
    }
  }

  function onSuccess(user) {
    alert("Welcome back!");
    setUser(user);
    navigate("/");
  }

  function onFailure(error) {
    console.error(error);
    alert(`Can't log in because of ${error}`);
  }

  return (
    <article className="page auth-page sign-in-page">
      <div className="container">
        <h2>Sign In</h2>
        <form className="auth-form flex-column" onSubmit={onSubmit}>
          {Inputs}
          <button>Sign In</button>
        </form>
        <footer>
          <p>
            Not a member yet? <Link to="/register">Sign up instead</Link>
          </p>
        </footer>
      </div>
    </article>
  );
}
