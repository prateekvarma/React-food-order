import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionDone, setSubmissionDone] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 }); //passing just 'item' is doubling up the no. of items
  }

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  }

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    //user data recieved from the child component (Checkout.js) as a prop function + cart data from the Context API
    setIsSubmitting(true);
    const response = await fetch("XXX/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    if(response.ok) {
      setIsSubmitting(false);
      setSubmissionDone(true);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return <CartItem 
                key={item.id} 
                name={item.name} 
                amount={item.amount} 
                price={item.price} 
                onRemove={cartItemRemoveHandler.bind(null, item.id)} 
                onAdd={cartItemAddHandler.bind(null, item)} 
                />
      })}
    </ul>
  );

  const modalActions = (<div className={classes.actions}>
                          <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
                          {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>} {/*Render button only when hasItems is true*/}
                      </div>);

  const cartModalContent = (<>
                          {cartItems}
                              <div className={classes.total}>
                                <span>Total Amount</span>
                                <span>{totalAmount}</span>
                              </div>
                              {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
                              {!isCheckout && modalActions}
                          </>);

  const isCurrentlySubmitting = <p>Sending order data to server...</p>;
  const submitSuccessMsg = <p>Order placed Successfully!</p>;

  return (
    <Modal onClose={props.onClose}>
        {!isSubmitting && !submissionDone && cartModalContent}
        {isSubmitting && isCurrentlySubmitting}
        {submissionDone && submitSuccessMsg}
    </Modal>
  )
};

export default Cart;
