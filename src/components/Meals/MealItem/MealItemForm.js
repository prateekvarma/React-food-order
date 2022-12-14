import { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true); //to handle error messages
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount; //convert string to int

    if(enteredAmount.trim().length === 0 || enteredAmountNum < 1 || enteredAmountNum > 5) {
      setAmountIsValid(false);
      return; //will stop the execution of the submitHandler method
    }

    //form amount is valid
    props.onAddToCart(enteredAmountNum);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid  && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
