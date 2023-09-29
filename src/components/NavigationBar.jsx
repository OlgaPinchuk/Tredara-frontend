import { Link } from "react-router-dom";

export function NavigationBar() {
  const user = null; // update after completing user funtionality

  return (
    <header className="navigation-bar">
      <div className="container flex-between">
        <h1 className="logo">Tredara</h1>
        {user ? (
          <button className="button-logout">Logout</button>
        ) : (
          <div className="auth-links">
            <Link to="/login">Sign In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
}
