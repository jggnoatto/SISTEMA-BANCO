

import "./mainButton.css";
import { Link } from "react-router-dom";

function MainButton ({texto, onClick, to, type = "button"}) {
    if (to) {
        return (
            <Link className="mainButton" to={to}>
                {texto}
            </Link>
        );
    }

    return (
        <button 
            className="mainButton" 
            onClick={onClick} 
            type={type} 
        >
            {texto}
        </button>
    );
}

export default MainButton;