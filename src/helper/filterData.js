export const FilterData = (AllProducts, data, type) => {
  if (type === "CATEGORY") {
    if (data.toUpperCase() === "ALL") {
      return AllProducts;
    } else {
      return AllProducts.filter((ele) => {
        if (ele.category.toUpperCase() === data.toUpperCase()) {
          return true;
        }
      });
    }
  } else if (type === "RANGE") {
    return AllProducts.filter((ele) => {
      if (ele.price < +data) {
        return true;
      }
    });
  } else if (type === "SORT") {
    if (data === "price-increment") {
      return AllProducts.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (data === "price-decrement") {
      return AllProducts.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (data === "name-increment") {
      return AllProducts.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
      });
    } else if (data === "name-decrement") {
      return AllProducts.sort((a, b) => {
        if (b.name < a.name) {
          return -1;
        }
      });
    }
  }
  return AllProducts;
};

export const TotalProductValue = (allProducts) => {
 
  return allProducts.reduce((prev, current) => {
    return current.totalPrice + prev;
  }, 0);
};
