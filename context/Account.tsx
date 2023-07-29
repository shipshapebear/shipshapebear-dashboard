"use client"
import React, { useContext, useState, useEffect, createContext } from "react"

const defaultValues = {
    user: null,
    setUser: () => { }
}

type UserType = { user: any, setUser: any }

const UserContext = createContext<UserType>(defaultValues)

const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState(null)


    return (
        <UserContext.Provider
            value={{
                ...defaultValues,
                user,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useStore must be used within StoreContext")
    }

    return context
}

export default UserProvider
