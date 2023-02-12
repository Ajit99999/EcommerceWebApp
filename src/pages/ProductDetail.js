import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormatPrice } from "../helper/formatPrice";
import useFetch from "../hooks/useFetch";
// import {  useNavigate } from 'react-router-dom'
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import ProductDetailShimmer from "../components/ProductDetailShimmer";
import useCartContext from "../hooks/useCartContext";

const ProductDetail = () => {
  const [amount, setAmount] = useState(1);
  const { id } = useParams();
  const { AddProductToCart } = useCartContext();
  const { state } = useFetch(
    `https://api.pujakaitem.com/api/products?id=${id}`
  );

  const navigate = useNavigate();
  const onClickAddAmountHandle = () => {
    setAmount((prev) => prev + 1);
  };
  const onClickRemoveAmountHandle = () => {
    setAmount((prev) => prev - 1);
  };
  const onAddCartHandler = () => {
    const newProdObj = {
      name: state?.data?.name,
      price: state?.data?.price,
      image: state?.data?.image?.[0]?.url,
      category: state?.data?.category,
      company: state?.data?.company,
      quantity: amount,
      totalPrice: amount * state?.data?.price,
      id: state?.data?.id,
    };
    AddProductToCart(newProdObj);
    navigate("/cart");
  };

  return !state?.data ? (
    <ProductDetailShimmer state={state} />
  ) : (
    <div className="product-detail-container">
      <div className="product-img-container">
        <img src={state?.data?.image?.[0]?.url} alt="not available" />
      </div>
      <div className="product-details">
        <h2>{state?.data?.name}</h2>
        <p>MRP: {FormatPrice(state?.data?.price, 10)}</p>

        <p>Deal of the day: {FormatPrice(state?.data?.price, 10)}</p>
        <p>Description: {state?.data?.description}</p>
        <div className="product-detail-icons"></div>
        <div className=""></div>
        <div className="product-detail-info">
          <p> {state?.data?.stock > 0 ? "Available" : "Not Available"} </p>
          <p>{state?.data?.company}</p>
          <p>{state?.data?.category}</p>
        </div>

        <div className="product-detail-amount">
          <button onClick={onClickRemoveAmountHandle} className="btn">
            {" "}
            <BiMinus className="cart-icon" />{" "}
          </button>
          <p className="product-detail-number"> {amount < 1 ? "1" : amount} </p>

          <button onClick={onClickAddAmountHandle} className="btn">
            {" "}
            <BsPlus className="cart-icon" />{" "}
          </button>
        </div>
        <div>
          <button onClick={onAddCartHandler}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
