// cartUtils.ts

import { getCartItems } from "@/lib/actions";
import { CartSchema } from "@/common.types";

export const handleCartUpdate = async (updateCount: (prevCount: number) => number) => {
    try {
        const cartItems: CartSchema[] = await getCartItems();
        const totalCount: number = cartItems.reduce((total, item) => total + item.quantity, 0);
        updateCount(totalCount);
    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
};
