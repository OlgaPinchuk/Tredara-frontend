import { useState } from "react";
import { Link } from "react-router-dom";

import InputField from "../components/InputField";
import fields from "../data/fields-sign-up.json";
import { useUser } from "../state/UserContext";

export function SignUpPage() {
  const [form, setForm] = useState({});
  const { setUser } = useUser();

  const Inputs = fields.map((item, index) => (
    <InputField field={item} key={index} state={[form, setForm]} />
  ));

  async function onSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:8080/api/signup", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => onSuccess(data))
      .catch((error) => onFailure(error));
  }

  function onSuccess(newUser) {
    console.log(newUser);

    alert("Welcome to Tredara!");
    setUser(newUser);
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
