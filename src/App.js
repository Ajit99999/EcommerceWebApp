import "./App.css";
import Footer from "./pages/Footer";
import Header from "./pages/Header";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductsList from "./pages/ProductsList";
import ProductDetail from "./pages/ProductDetail";
import ErrorPage from "./pages/ErrorPage";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Login from "./pages/Login";
import useAuthContext from "./hooks/useAuthContext";

function App() {
  const { AuthState , isAuthCheck  } = useAuthContext();
  // console.log(AuthState)
  return (
    isAuthCheck &&
    <>
      {/* <BrowserRouter> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/products" element={<ProductsList />}></Route>
        <Route path="/singleproduct/:id" element={<ProductDetail />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        {AuthState.isLogged && (
          <Route path="/order" element={<Order />}></Route>
        )}
        { !AuthState.isLogged && <Route path="/login" element={<Login />}></Route>      }
        
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Footer />
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
