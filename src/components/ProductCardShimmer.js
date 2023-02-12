import heroImg from "../images/hero.png";
const ProductCardShimmer = () => {
  return Array(10)
    .fill("")
    .map((ele, index) => {
      return (
        <div
          key={index}
          style={{ opacity: 0.12, backgroundColor: "whitesmoke" }}
          className="product-card-container"
        >
          <div className="product-card-img">
            <img src={heroImg} alt="not found" />
            <div className="product-card-info">
              <p>{"name"}</p>
              <p>{"price"}</p>
            </div>
          </div>
        </div>
      );
    });
};

export default ProductCardShimmer;
