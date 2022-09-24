import { useRef, useState } from "react";

import classes from "./Checkout.module.css"

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.length === 5;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true, //initial values for each sub state
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName); //boolean
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

        //check individual fields
        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid
        });

        //check entire form
        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid; //boolean to check if all fields are valid, so the entire form is valid

        if(!formIsValid) {
            return;
        }

        //everything is valid, pass data to the parent component as a prop function
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        });
    };

    const nameClasses = `${classes.control} ${formInputValidity.name ? "" : classes.invalid}`;
    const streetClasses = `${classes.control} ${formInputValidity.street ? "" : classes.invalid}`;
    const postalCodeClasses = `${classes.control} ${formInputValidity.postalCode ? "" : classes.invalid}`;
    const cityClasses = `${classes.control} ${formInputValidity.city ? "" : classes.invalid}`;


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameClasses}>
                <label htmlFor="name">Your Name</label>
                <input ref={nameInputRef} id="name" type="text" />
                {!formInputValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={streetClasses}>
                <label htmlFor="street">Street</label>
                <input ref={streetInputRef} id="street" type="text" />
                {!formInputValidity.street && <p>Please enter a valid street</p>}
            </div>
            <div className={postalCodeClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input ref={postalCodeInputRef} id="postal" type="text" />
                {!formInputValidity.postalCode && <p>Please enter a valid postal code (5 chars long)</p>}
            </div>
            <div className={cityClasses}>
                <label htmlFor="city">City</label>
                <input ref={cityInputRef} id="city" type="text" />
                {!formInputValidity.city && <p>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
            </div>
            <button className={classes.submit}>Confirm</button>
        </form>
    )    
};

export default Checkout;