import { createContext, useContext, useState } from "react";

const userContext = createContext();

export const useUserContext = () => {
  return useContext(userContext);
};

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullName: {
      fistName: "",
      lastName: "",
    },
  });
  return (
    <userContext.Provider value={{ user: user }}>
      {children}
    </userContext.Provider>
  );
};
export default UserContext;
