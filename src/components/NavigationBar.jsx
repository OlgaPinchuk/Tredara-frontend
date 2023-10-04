import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../state/UserContext";

export function NavigationBar() {
  // Global state
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:8080/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
      });

      if (response.ok) {
        setUser(null);
        alert("You logged out successfully!");
        navigate("/");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  }

  return (
    <header className="navigation-bar">
      <div className="container flex-between">
        <Link to="/">
          <h1 className="logo">Tredara</h1>
        </Link>
        {user ? (
          <button className="link-button" onClick={handleLogout}>
            Log out
          </button>
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
