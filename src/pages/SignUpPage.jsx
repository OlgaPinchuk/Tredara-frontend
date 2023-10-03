import { useState } from "react";
import { Link } from "react-router-dom";

import InputField from "../components/InputField";
import fields from "../data/fields-sign-up.json";

export function SignUpPage() {
  const [form, setForm] = useState({});

  const Inputs = fields.map((item, index) => (
    <InputField field={item} key={index} state={[form, setForm]} />
  ));

  return (
    <article className="page auth-page sign-up-page">
      <div className="container">
        <h2>Become a Member</h2>
        <form className="auth-form flex-column">
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
