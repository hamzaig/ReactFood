import { useReducer } from "react";
import CartContext from "./cart-context";


const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    if (action.type === "Add") {
        const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => {
            return item.id === action.item.id
        });

        const existingCartItem = state.items[existingCartItemIndex];
        // console.log(existingCartItem);
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }


        return {
            items: updatedItems,
            totalAmount: updateTotalAmount,
        }
    }
    if (action.type === "REMOVE") {
        console.log("Hello");
        const existingCartItemIndex = state.items.findIndex(item => {
            return item.id === action.id
        });
        const existingItem = state.items[existingCartItemIndex];
        const updateTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => {
                return item.id !== action.id
            })
        }
        else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updateTotalAmount,
        }
    }
    return defaultCartState;
}


const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "Add", item });
    };
    const removeItemToCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;