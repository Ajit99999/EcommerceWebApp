import { AiOutlineDelete } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
const CartListCard = ({
  name,
  price,
  quantity,
  totalPrice,
  company,
  image,
  id,
  onDeleteHandler,
  onDecrementHandle,
  onIncrementHandle,
}) => {
  const onDeleteHandle = () => {
    onDeleteHandler(id);
  };

  const onDecrementHandler = () => {
    onDecrementHandle(id);
  };
  const onIncrementHandler = () => {
    onIncrementHandle(id);
  };
  return (
    <div className="cartlist-container">
      <div className="cartlist-item">
        <img src={image} alt="Not available" />
        <p>{name}</p>
      </div>
      <div className="cartlist-rest-item">
        <p> {price} </p>
      </div>
      <div className="cartlist-rest-item-amount">
        <button onClick={onDecrementHandler} className="btn">
          <BiMinus className="cart-icon" />
        </button>
        <p> {quantity} </p>

        <button onClick={onIncrementHandler} className="btn">
          <BsPlus className="cart-icon" />
        </button>
      </div>
      <div className="cartlist-rest-item">
        <p> {totalPrice} </p>
      </div>
      <div className="cartlist-rest-item" onClick={onDeleteHandle}>
        <AiOutlineDelete className="icon" />
      </div>
    </div>
  );
};

export default CartListCard;
