import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();

export const CartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let newProduct;
    if (state.cartProductList?.length === 0) {
      newProduct = [...state.cartProductList, action.payload];
    } else {
      console.log(state.cartProductList);
      const count = state.cartProductList.findIndex(
        (elem) => elem.id === action.payload.id
      );
      if (count < 0) {
        newProduct = [action.payload, ...state.cartProductList];
      } else {
        newProduct = state.cartProductList.map((element) => {
          if (element.id === action.payload.id) {
            return {
              ...element,
              quantity: element.quantity + action.payload.quantity,
              totalPrice: element.totalPrice + action.payload.totalPrice,
            };
          } else {
            return element;
          }
        });
      }
    }

    return {
      cartProduct: action.payload,
      cartProductList: newProduct,
    };
  } else if (action.type === "DELETE_TO_CART") {
    const newProduct = state.cartProductList.filter(
      (elem) => elem.id !== action.payload
    );

    return {
      cartProductList: newProduct,
      cartProduct: state.cartProduct,
    };
  } else if (action.type === "INCREMENT") {
    const newProductArray = state.cartProductList.map((elem) => {
      if (elem.id === action.payload) {
        return {
          ...elem,
          quantity: elem.quantity + 1,
          totalPrice: elem.totalPrice + elem.price,
        };
      } else {
        return elem;
      }
    });

    return { cartProductList: newProductArray, cartProduct: state.cartProduct };
  } else if (action.type === "DECREMENT") {
    const newProductArray = state.cartProductList.map((elem) => {
      if (elem.id === action.payload) {
        return {
          ...elem,
          quantity: elem.quantity - 1,
          totalPrice: elem.totalPrice - elem.price,
        };
      } else {
        return elem;
      }
    });

    return { cartProductList: newProductArray, cartProduct: state.cartProduct };
  } else if (action.type === "DELETE_ALL") {
    return { cartProductList: [], cartProduct: {} };
  }
  return state;
};
const CartProvider = ({ children }) => {
  const cartProductsItems = JSON.parse(localStorage.getItem("items"));

  const [state, dispatch] = useReducer(CartReducer, {
    cartProductList:
      cartProductsItems?.length === 0 || !cartProductsItems
        ? []
        : cartProductsItems,
    cartProduct: {},
  });

  const AddProductToCart = (productObj) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: productObj,
    });
  };

  const DeleteProductToCart = (id) => {
    dispatch({
      type: "DELETE_TO_CART",
      payload: id,
    });
  };

  const IncrementToCart = (id) => {
    dispatch({
      type: "INCREMENT",
      payload: id,
    });
  };
  const DecrementToCart = (id) => {
    const product = state.cartProductList.find((elem) => {
      if (elem.id === id && elem.quantity === 1) {
        return true;
      }
    });

    if (product) {
      dispatch({
        type: "DELETE_TO_CART",
        payload: id,
      });
    }

    dispatch({
      type: "DECREMENT",
      payload: id,
    });
  };

  const DeleteAllProducts = () => {
    dispatch({
      type: "DELETE_ALL",
    });
  };

  useEffect(() => {
   
    localStorage.setItem("items", JSON.stringify(state.cartProductList));
  }, [state.cartProductList]);
  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        AddProductToCart,
        DeleteProductToCart,
        IncrementToCart,
        DecrementToCart,
        DeleteAllProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
