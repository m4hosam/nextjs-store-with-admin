export interface OrderItem {
    product_id: string;
    quantity: number;
    price: number;
}


export type loginSchema = {
    email: string;
    password: string;
}

export type CheckoutSchema = {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postal: string;
    total: number;
    order_items: OrderItem[];
}

export type CheckoutFormProps = {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postal: string;
}

export type AddressSchema = {
    address: string;
    city: string;
    state: string;
    postal: string;
    phone: string;
    email: string;
}


export type Address = {
    address: string;
    city: string;
    state: string;
    postal: string;
    phone: string;
}

export type User = {
    name: string;
    email: string;
    password: string;
    cookie_id: string;
}



export type CardProps = {
    id: string,
    name: string,
    brand: string;
    price: string;
    image: string;
};
export type CartProps = {
    product_id: string,
    name: string,
    brand: string;
    price: number;
    image: string;
    category: string;
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



