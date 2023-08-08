"use client";


import { createContext, useContext, useState } from "react";
import { products } from "@/drizzle/schema";
import { InferModel } from "drizzle-orm";

type ProductType = InferModel<typeof products>

type ProductContext = {
    product: ProductType;
    setProduct: any;
};

const Context = createContext<ProductContext | undefined>(undefined);

export default function ProductProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [product, setProduct] = useState<ProductType | any>(null);

    return (
        <Context.Provider value={{ product, setProduct }}>
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
