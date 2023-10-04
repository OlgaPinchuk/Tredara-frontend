// Node modules
import { createContext, useContext, useState } from "react";

// Properties
const initialValues = {
  user: null,
  setUser: () => {},
};
const Context = createContext(initialValues);

// Methods
export function UserProvider({ children }) {
  // Local state
  const [user, setUser] = useState(null);

  // Properties
  const value = { user, setUser };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useUser() {
  const context = useContext(Context);
  const errorText =
    "To use useUser(), you need to wrap the parent component with <UserProvider/>";

  // Safeguards
  if (!context) throw new Error(errorText);

  return context;
}
