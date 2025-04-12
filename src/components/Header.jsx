import React from "react";
import {Link} from "react-router-dom";
import MenuBar from '../assets/icons/HamburgerMenu.svg'
import MenuCross from '../assets/icons/HamburgerMenuClosed.svg'
import NavLink from "./NavLink.jsx";

function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [menuIsOpen, setMenuIsOpen] = React.useState("hidden absolute right-0 text-right px-1 bg-primary");
    const handleMenuButtonClick = () => {
        if (isOpen) {
            setIsOpen(false);
            setMenuIsOpen("hidden");
        } else {
            setIsOpen(true);
            setMenuIsOpen("absolute flex-col items-stretch right-0 text-right bg-primary w-50");
        }
    }
    return (
        <header className="bg-primary">
            <nav className="flex items-center justify-between px-0">
                <h1 className="x-h1 ml-1">Expense Tracker</h1>
                <img src={isOpen ? MenuCross : MenuBar} alt="MenuButton" onClick={handleMenuButtonClick}/>
            </nav>
            <ul className={menuIsOpen}>
                <NavLink destLink="/" destPage="Home" onClick={handleMenuButtonClick}></NavLink>
                <hr/>
                <NavLink destLink="/records" destPage="Records" onClick={handleMenuButtonClick}></NavLink>
                <hr/>
                <NavLink destLink="/summary" destPage="Summary" onClick={handleMenuButtonClick}></NavLink>

            </ul>
        </header>

    );
}

export default Header;