import { useContext } from "react";
import { CartContext } from "../context/Cart-context";

const useCartContext = () => {
  const {
    state,
    dispatch,
    AddProductToCart,
    DeleteProductToCart,
    IncrementToCart,
    DecrementToCart,
    DeleteAllProducts
  } = useContext(CartContext);

  return {
    state,
    dispatch,
    AddProductToCart,
    DeleteProductToCart,
    IncrementToCart,
    DecrementToCart,
    DeleteAllProducts
  };
};

export default useCartContext;
