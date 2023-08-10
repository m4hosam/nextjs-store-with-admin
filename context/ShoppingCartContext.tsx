"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getCartItems, addToCart, getProductsInCart } from "@/lib/actions";
import { productSchema } from "@/common.types";

type ShoppingCartProviderProps = {
    children: ReactNode;
};

interface Product {
    id: string;
    name: string;
    brand: string;
    price: string;
    image: string;
}

type NewCartItem = {
    id: string;
    product: Product;
    quantity: number;
};

type ShoppingCartContext = {
    getItemQuantity: (id: string) => number;
    increaseCartQuantity: (id: string) => void;
    decreaseCartQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    cartQuantity: number;
    cartItems: NewCartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<NewCartItem[]>([]);

    useEffect(() => {
        getProductsInCart().then((items) => {
            console.log(items);
            setCartItems(items);
        });
    }, []);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );

    function getItemQuantity(id: string) {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: string) {
        addToCart(id, 5);
        setCartItems((currItems) => {
            return currItems.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            });
        });
    }

    function decreaseCartQuantity(id: string) {
        setCartItems((currItems) => {
            return currItems.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return item;
                }
            }).filter((item) => item.quantity > 0);
        });
    }

    function removeFromCart(id: string) {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.id !== id);
        });
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                cartItems,
                cartQuantity,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}
