import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCardShimmer from "../components/ProductCardShimmer";
import { FilterData } from "../helper/filterData";
import useContextHook from "../hooks/useContextHook";
import ProductCard from "./ProductCard";
import ProductInfo from "./ProductInfo";
import ProductSearch from "./ProductSearch";

const ProductsList = () => {
  const { filterProducts, setFilterProducts, state } = useContextHook();
  const [sortVal, setsortVal] = useState("");
  const onSearchHandler = (data) => {
    const filterData = state?.data.filter((elem) => {
      if (
        elem.company.toUpperCase().includes(data.toUpperCase()) ||
        elem.name.toUpperCase().includes(data.toUpperCase())
      ) {
        return true;
      }
    });
    setFilterProducts(filterData);
  };
  const onCategoryChange = (data) => {
    const filterData = FilterData(state?.data, data, "CATEGORY");
    setFilterProducts(filterData);
  };

  useEffect(() => {
    return () => {
      setFilterProducts(state?.data);
    };
  }, [setFilterProducts, state?.data]);

  const onPriceHandle = (data) => {
    const filterData = FilterData(state?.data, data, "RANGE");
    setFilterProducts(filterData);
  };

  const onSortHandler = (data) => {
    const newSortedArray = [...state?.data];

    setsortVal(data);

    const filterData = FilterData(newSortedArray, data, "SORT");

    setFilterProducts(filterData);
  };

  return (
    <div className="products-list-container">
      <div className="products-list-sidebar-container">
        <ProductSearch
          onPriceHandle={onPriceHandle}
          onCategoryChange={onCategoryChange}
          onSearchHandler={onSearchHandler}
        />
      </div>
      <div className="products-list-home-container">
        <ProductInfo
          onSortHandler={onSortHandler}
          ProductNumbers={filterProducts?.length}
        />
        <div className="products-list-main-container">
          {filterProducts?.length === 0 && <p> No Product Found</p>}
          {filterProducts ? (
            filterProducts.map((prod) => {
              return (
                <Link
                  key={prod.id}
                  className="product-list-link"
                  to={`/singleproduct/${prod.id}`}
                >
                  <ProductCard {...prod} />
                </Link>
              );
            })
          ) : (
            <ProductCardShimmer />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
