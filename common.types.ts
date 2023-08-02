import { number } from "zod";


export type CardProps = {
    id: string,
    name: string,
    brand: string;
    price: string;
    image: string;
};

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