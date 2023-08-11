"use client";


import { createContext, useContext, useState } from "react";
import { products } from "@/drizzle/schema";
import { InferModel } from "drizzle-orm";

type ProductType = InferModel<typeof products>

type ProductContext = {
    product: ProductType;
    setProduct: any;
    action: string | null;
    setAction: any
    productToDelete: number | null
    setProductToDelete: any
};

const Context = createContext<ProductContext | undefined>(undefined);

export default function ProductProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [product, setProduct] = useState<ProductType | any>(null);
    const [action, setAction] = useState<string | null>(null)
    const [productToDelete, setProductToDelete] = useState(null)

    return (
        <Context.Provider value={{ product, setProduct, action, setAction, productToDelete, setProductToDelete }}>
            <>{children}</>
        </Context.Provider>
    );
}

export const UseProduct = () => {
    let context = useContext(Context);
    if (context === undefined) {
        throw new Error("useProduct must be used inside productProvider");
    } else {
        return context;
    }
};
