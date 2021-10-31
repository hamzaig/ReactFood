import React, { useRef, useState } from 'react';
import classes from "./Checkout.module.css";

const isEmpty = value => value.trim() === "";
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        city: true,
        street: true,
        postalCode: true,
    });


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

        const nameValid = !isEmpty(enteredName);
        const cityValid = !isEmpty(enteredCity);
        const streetValid = !isEmpty(enteredStreet);
        const postalCodeValid = isFiveChars(enteredPostalCode);

        setFormInputsValidity({
            name: nameValid,
            city: cityValid,
            street: streetValid,
            postalCode: postalCodeValid,
        });

        const formIsValid = nameValid && cityValid && streetValid && postalCodeValid;

        if (!formIsValid) {
            return;
        }

    }
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${!formInputsValidity.name && classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameRef} type='text' id='name' />
            </div>
            {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            <div className={`${classes.control} ${!formInputsValidity.street && classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input ref={streetRef} type='text' id='street' />
            </div>
            {!formInputsValidity.street && <p>Please enter a valid street!</p>}
            <div className={`${classes.control} ${!formInputsValidity.postalCode && classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={postalCodeRef} type='text' id='postal' />
            </div>
            {!formInputsValidity.postalCode && <p>Please enter a valid Postal Code!</p>}
            <div className={`${classes.control} ${!formInputsValidity.city && classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input ref={cityRef} type='text' id='city' />
            </div>
            {!formInputsValidity.city && <p>Please enter a valid city!</p>}
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
