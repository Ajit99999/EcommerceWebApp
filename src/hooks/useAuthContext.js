import { useContext } from "react";
import { AuthContext } from "../context/Auth-context";

const useAuthContext = () => {
  const {
    AuthState,
    Login,
    SignUp,
    dispatch,
    LogOut,
    isAuthCheck,
    ResetError,
    OrderPlaced,
  } = useContext(AuthContext);

  return {
    AuthState,
    Login,
    SignUp,
    dispatch,
    LogOut,
    isAuthCheck,
    ResetError,
    OrderPlaced,
  };
};

export default useAuthContext;
