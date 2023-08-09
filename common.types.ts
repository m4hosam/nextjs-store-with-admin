import { number } from "zod";


export type CardProps = {
    id: string,
    name: string,
    brand: string;
    price: string;
    image: string;
};
export type CartProps = {
    id: string,
    name: string,
    brand: string;
    price: string;
    image: string;
    quantity: number;
};

export type CartSchema = {
    product_id: string,
    quantity: number;
}

export type FormState = {
    productName: string;
    brand: string;
    category: string;
    price: string;
    image: string;
    stock_price: string;
};

export type productSchema = {
    id: string,
    name: string,
    brand: string;
    category: string;
    price: string;
    image: string;
    stock_price: number;
};