import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function Logout() {
  // localStorage.clear();
  const { unsetUser, setUser } = useContext(UserContext);

  // Clear the localStorage upon logout
  unsetUser();

  useEffect(() => {
    setUser({
      id: null,
      isAdmin: null,
    });
  }, []);

  return (
    //Redirect the user back to the login page.
    <Navigate to="/login" />
  );
}
