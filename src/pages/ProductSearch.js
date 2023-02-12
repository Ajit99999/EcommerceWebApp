import React, { useRef, useState } from "react";

const ProductSearch = ({
  onSearchHandler,
  onCategoryChange,
  onPriceHandle,
  ProductNumbers
}) => {
  const [priceValue, setPriceValue] = useState("50000");
  const productName = useRef();

  const onSubmitHandle = (e) => {
    e.preventDefault();

    if (productName.current.value.length === 0) {
      return;
    }
    onSearchHandler(productName.current.value);
    productName.current.value = "";
  };
  const onCategoryChangeHandle = (e) => {
    onCategoryChange(e.target.value);
  };
  const onPriceChangeHandle = (e) => {
    setPriceValue(e.target.value);
    onPriceHandle(priceValue);
  };

  return (
    <div className="product-search-container">
      <div className="product-search-input">
        <form className="product-search-form" onSubmit={onSubmitHandle}>
          <div className="input-div">
            <input id="productName" placeholder="Search" ref={productName} />
          </div>

          <div className="input-div">
            <p>Category</p>
            <select onChange={onCategoryChangeHandle} defaultValue={"All"}>
              {" "}
              <option value={"All"}>All</option>
              <option value={"Mobile"}>Mobiles</option>
              <option value={"Laptop"}>Laptops</option>
              <option value={"Computer"}>Computers</option>
              <option value={"Watch"}>Watches</option>
            </select>
          </div>

          <div className="input-div">
            <p>  Price </p>
            <input
              type={"range"}
              min={"0"}
              max={"100000"}
              defaultValue={priceValue}
              onInput={onPriceChangeHandle}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductSearch;
