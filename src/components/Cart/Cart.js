import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.totalAmount.toFixed(2);

    const cartItemsLen = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
        // console.log(item);
        cartCtx.addItem({ ...item, amount: 1 })
    };

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmiting(true);
        fetch("https://react-http-c28cc-default-rtdb.firebaseio.com/orders.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        console.log(userData);
        setIsSubmiting(false);
        setIsSubmited(true);
        cartCtx.clearCart();
    };

    const cartitems = (<ul className={classes["cart-items"]}>
        {cartCtx.items.map(item => {
            return (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                />
            );
        })}
    </ul>);

    const modalContent = (
        <>
            {cartitems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!isCheckout &&
                <div className={classes.actions}>
                    <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
                    {cartItemsLen && <button onClick={orderHandler} className={classes.button}>Order</button>}
                </div>}
        </>
    );

    const isSubmitingModelContent = <p>Sending request Waiting ...</p>;
    const didSubmitedModelContent = (
        <>
            <p>Successfully Sent the order ...</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmiting && !isSubmited && modalContent}
            {isSubmiting && isSubmitingModelContent}
            {!isSubmiting && isSubmited && didSubmitedModelContent}
        </Modal>
    )
}

export default Cart
