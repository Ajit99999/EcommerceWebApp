import OrderCardDetail from "./OrderCardDetail";

const OrderCard = ({ orders, orderId }) => {
 
  return (
    <>
     
      {orders &&
        orders.map((elem) => {
          return <OrderCardDetail key={elem.id} {...elem} />;
        })}
    </>
  );
};

export default OrderCard;
