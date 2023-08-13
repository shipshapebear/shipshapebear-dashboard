
import React from 'react'
import ProductProvider from '@/context/ProductProvider'


const Layout = ({ children }: any) => {
    return (
        <>
            <ProductProvider>
                {children}
            </ProductProvider>
        </>
    )
}

export default Layout