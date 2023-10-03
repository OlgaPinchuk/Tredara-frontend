import { useState } from "react";
import { Link } from "react-router-dom";

import InputField from "../components/InputField";
import fields from "../data/fields-sign-in.json";

export function SignInPage() {
  const [form, setForm] = useState({});

  const Inputs = fields.map((item, index) => (
    <InputField field={item} key={index} state={[form, setForm]} />
  ));

  return (
    <article className="page auth-page sign-in-page">
      <div className="container">
        <h2>Sign In</h2>
        <form className="auth-form flex-column">
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
