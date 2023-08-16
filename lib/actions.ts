
import axios from 'axios';
import { signIn } from 'next-auth/react'
import bcrypt from 'bcryptjs'


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
        // console.log("getProductsInCart Fuction")


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
    // password should be hashed before calling this function
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/autherize`, {
            email,
            password
        });
        // console.log("user/read: ", response.data)
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
            email: email
        });
        // console.log("getuser: ", response.data)
        // returns true if user exists, false if not
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createUser(email: string, password: string, name: string) {
    // password should be hashed before calling this function
    try {
        const cookie_id = ""
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/create`, {
            email,
            password,
            name,
            cookie_id
        });
        console.log("createUser status: ", response.data.success)
        return response.data.success;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function login(email: string, password: string) {
    const hashedPassword = bcrypt.hashSync(password, "$2a$10$QwS47P5iOzOxQclE1Fj7x.")
    // $2a$10$mMTXk7oLSz5YnFwj1SrmDuEfLB7U04JT6etUSULVOjoKJx.M/YiJa
    // $2a$10$eOsuM.ZiQjsy9RCV28ZmJOpoREerT4SbPpjy6gVVjJ.hUd.63VN4G

    console.log("hashedPassword: ", hashedPassword)
    try {
        const user = await getUser(email)
        // console.log("login user: ", user)
        // if no user with this email give register page message
        if (!user) {
            // User Not found
            return 404;
        }
        else {

            const userAutherized = await autherize(email, hashedPassword)
            // console.log("userAutherized: ", userAutherized)
            // if user autherized {user: {email, name}} else {user: {}}, 
            if (userAutherized) {
                const signInResponse = await signIn("credentials", {
                    email: email,
                    password: hashedPassword,
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
        }
        return 401;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function register(email: string, password: string, name: string) {
    const hashedPassword = bcrypt.hashSync(password, "$2a$10$QwS47P5iOzOxQclE1Fj7x.")
    try {
        const user = await getUser(email)
        // console.log("register user: ", user)
        // if user with this email exists give login page message
        if (user) {
            // conflict status code -> login page 
            return 409;
        }
        else {
            const createUserStatus = await createUser(email, hashedPassword, name)
            if (createUserStatus) {

                const signInResponse = await signIn("credentials", {
                    email: email,
                    password: hashedPassword,
                    redirect: false,
                });

                if (signInResponse && !signInResponse.error) {
                    return 200;
                }
                console.log("signInResponse: ", signInResponse)
                console.log("signInResponse.error: ", signInResponse?.error)
            }
            return 404;
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}




