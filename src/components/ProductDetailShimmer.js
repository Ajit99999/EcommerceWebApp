import { FormatPrice } from "../helper/formatPrice";
import heroImg from "../images/hero.png";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
const ProductDetailShimmer = ({ state }) => {
  return (
    <div className="product-detail-container" style={{ opacity: 0.12 }}>
      <div className="product-img-container">
        <img src={heroImg} alt="not available" />
      </div>
      <div className="product-details">
        <h2>{state?.data?.name}</h2>
        <p>MRP: {FormatPrice(state?.data?.price, 10)}</p>

        <p>Deal of the day: {FormatPrice(state?.data?.price, 10)}</p>
        <p>
          Description: It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that it has a more-or-less
          normal distribution of letters, as opposed to using 'Content here,
          content here', making it look like readable English. Many desktop
          publishing packages and web page editors
        </p>
        <div className="product-detail-icons"></div>
        <div className=""></div>
        <div className="product-detail-info">
          <p> {state?.data?.stock > 0 ? "Available" : "Not Available"} </p>
          <p>{state?.data?.company}</p>
          <p>{state?.data?.category}</p>
        </div>

        <div className="product-detail-amount">
          <p>
            <BiMinus className="icon" />
          </p>

          <p className="product-detail-number"> 1 </p>
          <p>
            <BsPlus className="icon" />{" "}
          </p>
        </div>
        <div>
          <button>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailShimmer;
