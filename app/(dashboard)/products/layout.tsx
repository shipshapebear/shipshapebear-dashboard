
import React from 'react'
import ProductProvider from '@/context/ProductProvider'

export const dynamic = 'force-dynamic'
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