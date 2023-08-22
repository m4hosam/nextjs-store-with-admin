// import { User, Session } from 'next-auth'

// export interface SessionInterface extends Session {
//     user: User & {
//         id: string;
//         name: string;
//         email: string;
//         avatarUrl: string;
//     };
// }



export type loginSchema = {
    email: string;
    password: string;
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
    price: string;
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