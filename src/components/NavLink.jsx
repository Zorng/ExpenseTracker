import React from 'react';
import {Link} from "react-router-dom";

function NavLink(props) {
    return (
        <li className="text-h3 py-3 pr-2 w-full"><Link to={props.destLink} className="w-full inline-block x-h3" >{props.destPage}</Link></li>
    );
}

export default NavLink;