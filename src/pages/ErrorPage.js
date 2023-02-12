import { Link } from "react-router-dom";

const ErrorPage = ()=>{

    return (  
        <div className="error-container" >
            <h1>404</h1>
            <h3>Oh no!!! You are Lost...</h3>
            <p>The page you are looking for doesn't exist</p>
            <Link to="/"  > <button  > Go Back </button>  </Link>   

        </div>
    )

}

export default ErrorPage;