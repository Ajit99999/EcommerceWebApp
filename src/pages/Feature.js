import { Link } from "react-router-dom";
import { FormatPrice } from "../helper/formatPrice";

const Feature = ({ state }) => {
  return (
    <div className="feature-container">
      {state.data &&
        state.data
          ?.filter((elem, index) => index < 3 && true )
          .map((elem) => {
            return (
              <Link
                to={`/singleproduct/${elem.id}`}
                key={elem.id}
                className="feature-list-link"
              >
                <div className="feature-list">
                  <div className="feature-img">
                    <img src={elem.image} alt={"Not availbale"} />
                  </div>

                  <p>{elem.name} </p>

                  <p>{FormatPrice(elem.price)}</p>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default Feature;
