import { FormatPrice } from "../helper/formatPrice";

const ProductCard = ({ image, name, category, price }) => {
  return (
    <div className="product-card-container">
      <div className="product-card-img">
        <img src={image} alt="not found" />
        <div className="product-card-info">
          <p>{name}</p>
          <p>{FormatPrice(price,10)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
