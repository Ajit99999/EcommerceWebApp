import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";

import { GiHamburgerMenu } from "react-icons/gi";
import useCartContext from "../hooks/useCartContext";
import useAuthContext from "../hooks/useAuthContext";
const NavBar = () => {
  const { state } = useCartContext();
  const { AuthState, LogOut } = useAuthContext();
  const onLogOutHandle = () => {
    LogOut();
  };
  return (
    <div className="nav-bar">
      <Link to={"/"} className="nav-list-item" >
        <div className="logo-container">
          <span> Ecommerce Kart </span>
        </div>
      </Link>

      <ul className="nav-list">
         <Link to="/products" className="nav-list-item">
          <li className="nav-list-item">Products</li>
        </Link>
        {AuthState.isLogged && (
          <Link to={"/order"}>
            <li className="nav-list-item"> My Orders </li>
          </Link>
        )}
        <Link to="/cart" className="nav-list-item  cart-icon">
          <li className="nav-list-item">
            {/* { state.cartProductList?.length > 0 && state.cartProductList?.length } */}
            <BsFillCartFill />
          </li>
        </Link>
        {!AuthState.isLogged ? (
          <Link to="/login" className="nav-list-item">
            <li className="nav-list-item">Log in</li>
          </Link>
        ) : (
          <li onClick={onLogOutHandle}> Log out</li>
        )}

        
  {AuthState.isLogged &&    <li className="nav-list-item">    Welcome {AuthState?.user?.userName}  </li>   }
       
        <Link to="/contact" className="nav-list-item">
          <li className="nav-list-item">Contact</li>
        </Link>
      </ul>

      <div className="mobile-nav-bar">
        <div className="mobile-nav-menu">
          <GiHamburgerMenu />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
