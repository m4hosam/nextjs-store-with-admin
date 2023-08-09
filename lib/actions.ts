
import axios from 'axios';


const URL = `${process.env.NEXT_PUBLIC_API_URL}products/read`;
const cartURL = `${process.env.NEXT_PUBLIC_API_URL}cart/get`;
const cartItemsURL = `${process.env.NEXT_PUBLIC_API_URL}cart/getall`;

export async function getProducts() {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const getProduct = async (id: string) => {
    const res = await fetch(`${URL}/${id}`);

    return res.json();
}


export async function getCartItems() {
    try {
        const response = await axios.get(cartURL);
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getProductsInCart() {
    try {
        const response = await axios.get(cartItemsURL);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function addToCart(product_id: string, quantity: number) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}cart/add`, {
            product_id,
            quantity
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}




