import "./mainButton.css";
import { Link } from "react-router-dom";

function MainButton ({texto, onClick}) {
    return (
        <Link to={onClick}><button>{texto}</button></Link>
    )
}

export default MainButton;