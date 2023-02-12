import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useReducer } from "react";
import { db } from "../firebase/firebase";
import useAuthContext from "./useAuthContext";

export const CollectionReducer = (state, action) => {
  if (action.type === "READ") {
    return {
      ...state,
      ordersList: action.payload,
      errorValue: null,
    };
  } else if (action.type === "CREATE") {
    return { ...state, ordersList: action.payload, errorValue: null };
  } else if (action.type === "READ") {
    return { ...state, ordersList: action.payload, errorValue: null };
  } else if (action.type === "ERROR") {
    return { ...state, ordersList: [], errorValue: action.payload };
  } else if (action.type === "RESET") {
    return { ...state, errorValue: null };
  }
  return state;
};
const useCollection = (collectionName) => {

  const  { AuthState } =  useAuthContext()  
  const [CollectionState, dispatch] = useReducer(CollectionReducer, {
    ordersList: null,
    errorValue: null,
  });

  const createOrders = async (orderDetail) => {
    try {
      dispatch({
        type: "RESET",
      });
      const res = await addDoc(collection(db, collectionName), orderDetail);
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: "ERROR",
        payload: err.message,
      });
    }
  };

  useEffect(() => {
    readOrders();
  }, []);

  const readOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));

      let ordersListArray = [];
      querySnapshot.forEach((doc) => {
       
        ordersListArray = [...ordersListArray, doc.data()];
      });
      const filterOrderListArray = ordersListArray.filter((ele)=>ele.userId === AuthState?.user?.id ) 
      
      dispatch({
        type: "READ",
        payload: filterOrderListArray,
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.message,
      });
    }
  };

  return {
    createOrders,
    readOrders,
    CollectionState,
  };
};

export default useCollection;
