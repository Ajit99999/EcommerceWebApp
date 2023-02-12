import { useEffect, useState } from "react";
import useCollection from "../hooks/useCollection";
import OrderCard from "./OrderCard";

const Order = () => {
    const { readOrders, CollectionState } = useCollection("orders");
    
    if (CollectionState.ordersList?.length === 0) {
        return (
            <div className="order-container" >
                <h3> No orders made yet  </h3>
             </div>
        )
    }
    return (

        <div className="order-main-container">
            {CollectionState?.ordersList && <div className="order-title-container">
                <p className="order-item" >Item</p>
                <p className="order-category" >Category</p>
                <p className="order-qty" >Quantity</p>
                <p className="order-price" >TotalPrice</p>
            </div>}

            {CollectionState?.ordersList &&

                CollectionState?.ordersList.map((elem) => {
                    return <OrderCard key={elem.orderId} {...elem} />;
                })}
        </div>
    );
};

export default Order;
