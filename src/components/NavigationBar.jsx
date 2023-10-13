import { Link, useNavigate } from "react-router-dom";

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
        // clearCookie("Tredara");
        setUser(null);
        localStorage.removeItem("user");
        alert("You logged out successfully!");
        navigate("/");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  }

  function clearCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
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
