import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); //check if item is already present
    const existingCartItem = state.items[exisitingCartItemIndex]; //pulls out the exisiting item
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount, //add additional amount on the same item
      };
      updatedItems = [...state.items]; //extract existing snapshot of the state
      updatedItems[exisitingCartItemIndex] = updatedItem; //override the existing item with the newly added properties
    } else {
      //it's a new item that is not yet present in the cart
      updatedItems = state.items.concat(action.item); //{ ...state.item, ...action.item }
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {};

  const cartContextData = {
    //This data object will be dynamic
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContextData}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
