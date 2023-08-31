import axios from 'axios';
import { signIn } from 'next-auth/react'
import bcrypt from 'bcryptjs'
import { AddressSchema } from '@/common.types';
import { ProductPropsAdmin, orderUpdateAdmin } from '@/common.types';


const productsURL = `${process.env.NEXT_PUBLIC_API_URL}admin/products`;
const ordersURL = `${process.env.NEXT_PUBLIC_API_URL}admin/orders`;



// products admin actions
export async function getProducts() {
    try {
        const response = await axios.get(productsURL);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getProduct(id: string) {
    try {
        const response = await axios.get(`${productsURL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createProduct(product: ProductPropsAdmin) {
    try {
        const response = await axios.post(productsURL, product);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function updateProduct(id: string, product: ProductPropsAdmin) {
    try {
        const response = await axios.put(`${productsURL}/${id}`, product);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteProduct(id: string) {
    try {
        const response = await axios.delete(`${productsURL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}







// orders admin actions
export async function getOrders() {
    try {
        const response = await axios.get(ordersURL);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getOrder(id: string) {
    try {
        const response = await axios.get(`${ordersURL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateOrder(id: string, order: orderUpdateAdmin) {
    try {
        const response = await axios.put(`${ordersURL}/${id}`, order);
        return response.data?.success;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

