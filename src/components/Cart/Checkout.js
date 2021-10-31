import React from 'react';
import classes from "./Checkout.module.css";

const Checkout = (props) => {

    const nameRef = useRef();
    const cityRef = useRef();
    const postalCodeRef = useRef();
    const streetRef = useRef();

    const confirmHandler = (e) => {
        e.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredCity = cityRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredPostalCode = postalCodeRef.current.value;

    }
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameRef} type='text' id='name' />
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Street</label>
                <input ref={streetRef} type='text' id='street' />
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={postalCodeRef} type='text' id='postal' />
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input ref={cityRef} type='text' id='city' />
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;
