
import axios from 'axios';


const URL = `${process.env.NEXT_PUBLIC_API_URL}products/read`;

export async function getProducts() {
    // const res = await fetch(URL);
    // console.log(res.json());
    // return res.json();
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





