"use client"
import { createContext, ReactNode, useContext, useState, useMemo } from "react";

type ShoppingCartProviderProps = {
    children: ReactNode;
};

type CartItem = {
    id: string;
    quantity: number;
};

type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: string) => number;
    increaseCartQuantity: (id: string) => void;
    decreaseCartQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    cartQuantity: number;
    cartItems: CartItem[];
};

const ShoppingContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        1
    );

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id: string) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: string) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function decreaseCartQuantity(id: string) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function removeFromCart(id: string) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id);
        });
    }



    return (
        <ShoppingContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity,
            }}
        >
            {children}
            {/* <ShoppingCart isOpen={isOpen} /> */}
        </ShoppingContext.Provider>
    );
}