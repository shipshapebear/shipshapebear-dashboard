
import React from 'react'
import ProductProvider from '@/context/ProductProvider'

const Layout = ({ children }) => {
    return (
        <>
            <ProductProvider>
                {children}
            </ProductProvider>
        </>
    )
}

export default Layout