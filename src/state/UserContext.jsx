// Node modules
import { createContext, useContext, useState, useEffect } from "react";

// Properties
const initialValues = {
  user: null,
  setUser: () => {},
};
const Context = createContext(initialValues);
const LOCAL_STORAGE_KEY = "user";

// Methods
export function UserProvider({ children }) {
  // Local state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  function updateUser(newUser) {
    setUser(newUser);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
  }

  // Properties
  const value = { user, setUser: updateUser };

  return (
    <Context.Provider value={value}>
      {loading ? <p>Loading user data...</p> : children}
    </Context.Provider>
  );
}

export function useUser() {
  const context = useContext(Context);
  const errorText =
    "To use useUser(), you need to wrap the parent component with <UserProvider/>";

  // Safeguards
  if (!context) throw new Error(errorText);

  return context;
}
