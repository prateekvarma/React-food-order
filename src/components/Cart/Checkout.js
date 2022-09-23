import { useRef } from "react";

import classes from "./Checkout.module.css"

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.length === 5;

const Checkout = (props) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler = (event) => {
        event.preventDeafault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName); //boolean
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid; //boolean to check if all fields are valid, so the entire form is valid

        if(!formIsValid) {
            return;
            
        }
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Your Name</label>
                <input ref={nameInputRef} id="name" type="text" />
            </div>
            <div className={classes.control}>
                <label htmlFor="street">Street</label>
                <input ref={streetInputRef} id="street" type="text" />
            </div>
            <div className={classes.control}>
                <label htmlFor="postal">Postal Code</label>
                <input ref={postalCodeInputRef} id="postal" type="text" />
            </div>
            <div className={classes.control}>
                <label htmlFor="city">City</label>
                <input ref={cityInputRef} id="city" type="text" />
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
            </div>
            <button className={classes.submit}>Confirm</button>
        </form>
    )    
};

export default Checkout;