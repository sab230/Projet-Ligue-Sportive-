import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
        if (itemIndex !== -1) {
            if (item.size) {
                const updatedCart = [...cart];
                const s = updatedCart[itemIndex].size;
                updatedCart[itemIndex].size = [...s, item.size];
                setCart(updatedCart);
            } else {
                const updatedCart = [...cart];
                updatedCart[itemIndex].quantity += 1;
                setCart(updatedCart);
            }
        } else {
            if (item.size) {
                setCart([...cart, { ...item, size: [item.size] }]);
            } else {
                setCart([...cart, { ...item, quantity: 1 }]);
            }
        }
    };

    const removeFromCart = (itemId) => {
        const itemIndex = cart.findIndex((cartItem) => cartItem.id === itemId);
        if (itemIndex !== -1) {
            const item = cart[itemIndex];
            if (item.size) {
                const updatedCart = [...cart];
                const s = updatedCart[itemIndex].size;
                s.pop();
                updatedCart[itemIndex].size = [...s];
                setCart(updatedCart);

                if (updatedCart[itemIndex].size.length === 0) {
                    updatedCart.splice(itemIndex, 1);
                    setCart(updatedCart);
                }
            } else {
                const updatedCart = [...cart];
                updatedCart[itemIndex].quantity -= 1;
                setCart(updatedCart);

                if (updatedCart[itemIndex].quantity === 0) {
                    updatedCart.splice(itemIndex, 1);
                    setCart(updatedCart);
                }
            }
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const doesItemExistInCart = (itemId) => {
        return cart.some((item) => item.id === itemId);
    }

    const contextValues = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        doesItemExistInCart
    };

    return (
        <CartContext.Provider value={contextValues}>
            {children}
        </CartContext.Provider>
    );
};


export default CartContextProvider;
