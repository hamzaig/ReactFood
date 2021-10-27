import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context';
import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;
    // console.log(cartCtx);
    const numberOfCartItems = cartCtx.items.reduce((acc, elem) => {
        return acc + elem.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted && classes.bump}`;
    useEffect(() => {
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer)
        }
    }, [items])
    return (
        <>
            <button className={btnClasses} onClick={props.onClick}>
                <span className={classes.icon}>
                    <CartIcon />
                </span>
                <span>Your Cart</span>
                <span className={classes.badge}>{numberOfCartItems}</span>
            </button>
        </>
    )
}

export default HeaderCartButton
