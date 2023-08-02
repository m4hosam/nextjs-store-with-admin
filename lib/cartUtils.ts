// lib/cartUtils.ts

import { serialize, parse } from 'cookie';
import { CardProps } from '@/common.types'; // Update the import path based on your project's folder structure

const CART_COOKIE_NAME = 'cart';

export function addToCart(res: any, product: CardProps): void {
    const existingCart = parse(res.getHeader('Set-Cookie') || '')[CART_COOKIE_NAME] || '[]';
    const cartItems = JSON.parse(existingCart);
    const updatedCart = [...cartItems, product];
    const cookieValue = serialize(CART_COOKIE_NAME, JSON.stringify(updatedCart), {
        path: '/',
        httpOnly: true,
        maxAge: 604800, // One week in seconds
    });
    res.setHeader('Set-Cookie', cookieValue);
}

export function getCart(req: any): CardProps[] {
    const existingCart = parse(req.headers.cookie || '')[CART_COOKIE_NAME] || '[]';
    return JSON.parse(existingCart);
}

export function clearCart(res: any): void {
    const cookieValue = serialize(CART_COOKIE_NAME, '[]', {
        path: '/',
        httpOnly: true,
        maxAge: -1, // This will remove the cookie
    });
    res.setHeader('Set-Cookie', cookieValue);
}


// Function to get cart items and their quantities from the API
export const getCartItems = async (): Promise<{ [productId: string]: number }> => {
    try {
        const response = await fetch('/api/cart');
        if (!response.ok) {
            throw new Error('Failed to fetch cart items from the API.');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return {};
    }
};
