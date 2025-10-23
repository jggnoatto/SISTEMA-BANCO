import "./sideBar.css";
import { Link } from "react-router-dom";

function SideBar (){
    return (
        <aside className="side-bar">
            <nav>
                    <ul className="side-bar-menu">
                        <li className="menu-item">
                            <Link to="/inicio">Início</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/depósito">Depósito</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/saque">Saque</Link>
                        </li>
                    </ul>
            </nav>
            
        </aside>
    )
}

export default SideBar;