import { createContext, useEffect, useReducer, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  if (action.type === "PENDING") {
    return {
      ...state,
      user: null,
      isLogged: state.isLogged,
      isPending: true,
      errorValue: null,
    };
  } else if (action.type === "ERROR") {
    return {
      ...state,
      user: null,
      isLogged: false,
      isPending: false,
      errorValue: action.payload,
    };
  } else if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload,
      isLogged: true,
      isPending: false,
      errorValue: null,
    };
  } else if (action.type === "SIGN_UP") {
    return {
      ...state,
      user: action.payload,
      isLogged: true,
      isPending: false,
      errorValue: null,
    };
  } else if (action.type === "LOG_OUT") {
    return {
      ...state,
      user: null,
      isLogged: false,
      isPending: false,
      errorValue: null,
    };
  } else if (action.type === "RESET") {
    return { ...state, errorValue: null };
  } else if (action.type === "ORDER") {
    const newUserState = { ...state.user, orders: action.payload };
    return {
      ...state,
      user: newUserState,
    };
  }
  return state;
};

const AuthProvider = ({ children }) => {
  const [isAuthCheck, setisAuthCheck] = useState(false);
  const [AuthState, dispatch] = useReducer(AuthReducer, {
    user: null,
    isLogged: false,
    isPending: false,
    errorValue: null,
  });
  const navigate = useNavigate();
  const SignUp = async (user) => {
    const { email, password, userName } = user;

    dispatch({
      type: "PENDING",
    });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: userName,
      });

      const userDetails = {
        userName: userCredential.user.displayName,
        email: userCredential.user.email,
        id: userCredential.user.uid,
        orders: [],
      };
      dispatch({
        type: "SIGN_UP",
        payload: userDetails,
      });
      navigate(-1);
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: "ERROR",
        payload: err.message,
      });
    }
  };
  const Login = async (user) => {
    const { email, password } = user;
    dispatch({
      type: "PENDING",
    });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userDetails = {
        userName: userCredential.user.displayName,
        email: userCredential.user.email,
        id: userCredential.user.uid,
        orders: [],
      };
      dispatch({
        type: "LOGIN",
        payload: userDetails,
      });
      navigate(-1);
    } catch (err) {
      console.log(err.message);

      dispatch({
        type: "ERROR",
        payload: err.message,
      });
    }
  };

  const LogOut = async () => {
    try {
      dispatch({
        type: "PENDING",
      });
      await signOut(auth);
      dispatch({
        type: "LOG_OUT",
      });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.message,
      });
    }
  };
  const OrderPlaced = (orderDetails) => {
    dispatch({
      type: "ORDER",
      payload: orderDetails,
    });
  };
  const ResetError = () => {
    dispatch({
      type: "RESET",
    });
  };

  useEffect(() => {
    // if (AuthState.isLogged) {
    //   navigate("/products");
    // }
    // else{
    //     navigate("/")
    // }
    // console.log("called");
  }, [AuthState.isLogged]);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDetails = {
          userName: user.displayName,
          email: user.email,
          id: user.uid,
          orders: [],
        };
        dispatch({
          type: "LOGIN",
          payload: userDetails,
        });
      } else {
        // console.log("no user");
      }
      setisAuthCheck(true);
    });
    unSub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        AuthState,
        Login,
        SignUp,
        dispatch,
        LogOut,
        isAuthCheck,
        ResetError,
        OrderPlaced
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
