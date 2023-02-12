import { useContext } from "react";

import { AppContext } from "../context/App-context";

const useContextHook = () => {
  const { state , filterProducts ,setFilterProducts } = useContext(AppContext);
 
  return {
    state,
    filterProducts,
    setFilterProducts
  }
  
};
export default useContextHook;
