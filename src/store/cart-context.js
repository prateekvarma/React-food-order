import { createContext } from "react";

const CartContext = createContext({
  //initialize the context - this can be omitted, but helps the IDE with auto completion
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;