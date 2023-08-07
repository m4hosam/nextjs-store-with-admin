
import axios from 'axios';


const URL = `${process.env.NEXT_PUBLIC_API_URL}products/read`;
const cartAPI = `${process.env.NEXT_PUBLIC_API_URL}cart/get`;

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
        const response = await axios.get(cartAPI);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}




