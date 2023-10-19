import { useNavigate } from "react-router-dom";

import { useUser } from "../state/UserContext";

export function NavigationBar() {
  // Global state
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // Methods
  async function handleLogout() {
    try {
      const jwtToken = localStorage.getItem("tredara-token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("tredara-token");
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
        <a href="/">
          <h1 className="logo">Tredara</h1>
        </a>
        {user ? (
          <button className="link-button" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="auth-links">
            <a href="/login">Sign In</a>
            <a href="/register">Sign Up</a>
          </div>
        )}
      </div>
    </header>
  );
}
