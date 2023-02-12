const OrderCardDetail = ({ image, name, totalPrice, quantity, category }) => {
  
  return (
    <div className="cartlist-container">
      <div className="cartlist-item">
        
        <img src={image} alt="Not available" />
        <p>{name}</p>
      </div>
      <div className="cartlist-rest-item">
        <p> {category} </p>
      </div>
      <div className="cartlist-rest-item-amount">
        <p> {quantity} </p>
      </div>
      <div className="cartlist-rest-item">
        <p> {totalPrice} </p>
      </div>
    </div>
  );
};

export default OrderCardDetail;
