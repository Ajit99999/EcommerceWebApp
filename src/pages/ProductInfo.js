const ProductInfo = ({ onSortHandler, ProductNumbers }) => {
  const onSortChangeHandle = (e) => {
    onSortHandler(e.target.value);
  };
  return (
    <div className="products-info--container">
      <h4> Showing results of {ProductNumbers} products</h4>
      <div className="product-select-option">
        <select onChange={onSortChangeHandle} defaultValue={"Sort By"}>
          <option>Sort By</option>
          <option value={"price-increment"}>Price [Low to High]</option>
          <option value={"price-decrement"}>Price [High to Low]</option>
          <option value={"name-increment"}>Alphabetic [A to Z]</option>
          <option value={"name-decrement"}>Alphabetic [Z to A]</option>
        </select>
      </div>
    </div>
  );
};

export default ProductInfo;
