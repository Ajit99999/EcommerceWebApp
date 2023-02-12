import { Link, useNavigate } from "react-router-dom";
import { TotalProductValue } from "../helper/filterData";
import useCartContext from "../hooks/useCartContext";
import CartListCard from "./CartListCard";
import toast, { Toaster } from "react-hot-toast";
import useAuthContext from "../hooks/useAuthContext";
import useCollection from "../hooks/useCollection";

const Cart = () => {
  const {
    state,
    DeleteProductToCart,
    IncrementToCart,
    DecrementToCart,
    DeleteAllProducts,
  } = useCartContext();
  const { AuthState, OrderPlaced } = useAuthContext()
  console.log(state)
  const { createOrders } = useCollection("orders")
  const navigate = useNavigate();

  const onDeleteHandler = (id) => {
    DeleteProductToCart(id);
  };

  const onDecrementHandle = (id) => {
    DecrementToCart(id);
  };
  const onIncrementHandle = (id) => {
    IncrementToCart(id);
  };

  const onClearCartHandler = () => {
    DeleteAllProducts();
  };

  const onOrderPlaceHandler = () => {
   
    if (!AuthState.isLogged) {
      navigate('/login');
    }
    else {
      OrderPlaced(state.cartProductList);
       
      toast.success("You have successfully placed the order");
      createOrders({
        userId:AuthState?.user?.id,
        orders:state.cartProductList,
        orderId: crypto.randomUUID()
      })
      DeleteAllProducts();
    }

  };

  return (
    <div className="cart-main-container">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="cart-title-container">
        <p>Item</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Sub-Total</p>
        <p>Remove</p>
      </div>
      <div className="cart-details-container">
        {state.cartProductList &&
          state.cartProductList.map((ele) => {
            return (
              <CartListCard
                key={ele.id}
                {...ele}
                onIncrementHandle={onIncrementHandle}
                onDecrementHandle={onDecrementHandle}
                onDeleteHandler={onDeleteHandler}
              />
            );
          })}

        {state?.cartProductList?.length === 0 && <p> No products found.... </p>}
      </div>
      <div className="cart-footer-container">
        <div className="cart-left-button">
          <Link to={"/products"}>
            {" "}
            <button>Continue Shopping </button>{" "}
          </Link>
        </div>
        <div className="cart-right-button">
          {state?.cartProductList?.length > 0 && (
            <button onClick={onClearCartHandler}>Clear Cart </button>
          )}
        </div>
      </div>
      {state?.cartProductList?.length > 0 && (
        <div className="cart-total-info">
          <p> Sub total : {TotalProductValue(state?.cartProductList)} </p>
          <p>
            Shipping Fee : {state?.cartProductList?.length === 0 ? 0 : 100}{" "}
          </p>
          <h3>
            Total Amount :{" "}
            {TotalProductValue(state?.cartProductList) +
              (state?.cartProductList?.length === 0 ? 0 : 100)}
          </h3>
        </div>
      )}

      <div className="cart-order-container">
        {state?.cartProductList?.length > 0 && (
          <button onClick={onOrderPlaceHandler}> Place Your Order </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
