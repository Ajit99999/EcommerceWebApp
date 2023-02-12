import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  if (action.type === "PENDING") {
    return { ...state, data: null, isloading: true, error: null };
  } else if (action.type === "SUCCESS") {
    return { ...state, data: action.payload, isloading: false, error: null };
  } else if (action.type === "ERROR") {
    return { ...state, data: null, isloading: false, error: action.payload };
  }

  return state;
};
const useFetch = (url) => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isloading: false,
    error: null,
  });

  const FetchProducts = async (url) => {
    try {
      dispatch({
        type: "PENDING",
      });

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();

      dispatch({
        type: "SUCCESS",
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.message,
      });
      console.log(err);
    }
  };

  useEffect(() => {
    FetchProducts(url);
  }, [url]);

  return {
    state,
    dispatch,
  };
};

export default useFetch;
