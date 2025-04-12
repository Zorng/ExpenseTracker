import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div>
            <p>404 NOT FOUND!</p>
            <Link to="/"> Back to Home</Link>
        </div>
    );
}

export default NotFound;