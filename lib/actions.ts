
import axios from 'axios';
import { signIn } from 'next-auth/react'


const URL = `${process.env.NEXT_PUBLIC_API_URL}products/read`;
const cartURL = `${process.env.NEXT_PUBLIC_API_URL}cart/get`;
const cartItemsURL = `${process.env.NEXT_PUBLIC_API_URL}cart/getall`;
const cartItemsNumber = `${process.env.NEXT_PUBLIC_API_URL}cart/count`;

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
export async function getCartItemsNumber() {
    try {
        const response = await axios.get(cartItemsNumber);
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
        console.log("getProductsInCart Fuction")


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

// Authentication
export async function autherize(email: string, password: string) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/autherize`, {
            email,
            password
        });
        console.log("user/read: ", response.data)
        // returns user {email and name} if user autherized, empty object if not
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function getUser(email: string) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/read`, {
            email
        });
        console.log("getuser: ", response.data)
        // returns true if user exists, false if not
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createUser(email: string, password: string, name: string) {
    try {
        const cookie_id = ""
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/create`, {
            email,
            password,
            name,
            cookie_id
        });
        return response.data.success;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function login(email: string, password: string) {
    try {
        const user = await getUser(email)
        console.log("login user: ", user)
        // if no user with this email give register page message
        if (!user) {
            return 404;
        }
        const userAutherized = await autherize(email, password)
        console.log("userAutherized: ", userAutherized)
        // if user autherized {user: {email, name}} else {user: {}}, 
        if (userAutherized) {
            const signInResponse = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
            });
            // User autherized
            if (signInResponse && !signInResponse.error) {
                return 200;
            }
        }
        // user not autherized wrong password or not registered
        else {
            return 401;

        }
        return 401;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function register(email: string, password: string, name: string) {
    try {
        const user = await getUser(email)
        console.log("register user: ", user)
        // if user with this email exists give login page message
        if (user) {
            // conflict status code -> login page 
            return 409;
        }
        else {
            const createUserStatus = await createUser(email, password, name)
            if (createUserStatus) {

                const signInResponse = await signIn("credentials", {
                    email: email,
                    password: password,
                    redirect: false,
                });

                if (signInResponse && !signInResponse.error) {
                    return 200;
                }
            }
            return 404;
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}




