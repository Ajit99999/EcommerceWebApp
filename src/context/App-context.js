import { createContext, useEffect, useState } from "react";

import useFetch from "../hooks/useFetch";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [filterProducts, setFilterProducts] = useState(null);

  const { state } = useFetch("https://api.pujakaitem.com/api/products");

  useEffect(() => {
    setFilterProducts(state?.data);
  }, [state?.data]);

  return (
    <AppContext.Provider
      value={{
        state,
        filterProducts,
        setFilterProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
