import React from 'react'
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = () => {
    return (
        <>
            <header>
                <h1>ReactFood</h1>
                <button>Card</button>
            </header>
            <div>
                <img src={mealsImage} alt="A table full of delicious food!" />
            </div>
        </>
    )
}

export default Header
