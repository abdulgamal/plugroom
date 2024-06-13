import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleUser = (value) => {
    setUser(value);
    localStorage.setItem("user", JSON.stringify(value));
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    let localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        handleUser,
        handleLogOut,
        selectedVenue,
        setSelectedVenue,
        selectedBooking,
        setSelectedBooking,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default ContextProvider;
