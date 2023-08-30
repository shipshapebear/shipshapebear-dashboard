"use client"
import { Profile } from "@/types/collection";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import useSWR from "swr";
import { useSupabase } from "./SupabaseProvider";
import React from "react";


interface ContextI {
    user: any;
    error: any;
    isLoading: boolean;
    mutate: any;
    loginError: string,
    signOut: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<string | null>;
}
const Context = createContext<ContextI>({
    user: null,
    error: null,
    isLoading: true,
    loginError: "",
    mutate: null,
    signOut: async () => { },
    signInWithEmail: async (email: string, password: string) => null,
});

export default function SupabaseAuthProvider({
    serverSession,
    children,
}: {
    serverSession?: Session | null;
    children: React.ReactNode;
}) {
    const { supabase } = useSupabase();
    const router = useRouter();
    const [loginError, setLoginError] = React.useState<string>("")

    // Get USER
    const getUser = async () => {
        const { data: user, error } = await supabase
            .from("profile")
            .select("*")
            .eq("id", serverSession?.user?.id)
            .single();
        if (error) {
            console.log(error);
            return null;
        } else {
            return user;
        }
    };

    const {
        data: user,
        error,
        isLoading,
        mutate,
    } = useSWR(serverSession ? "profile-context" : null, getUser);

    // Sign Out
    const signOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    // Sign-In with Email
    const signInWithEmail = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        router.refresh()

        if (error) {
            setLoginError(error.message)
            return error.message;
        }

        return null;
    };

    // Refresh the Page to Sync Server and Client
    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.access_token !== serverSession?.access_token) {
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, supabase, serverSession?.access_token]);


    const userdata = {
        ...user,
        session: serverSession
    }

    const exposed: ContextI = {
        user: userdata,
        error,
        isLoading,
        mutate,
        signOut,
        signInWithEmail,
        loginError
    };

    return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useAuth = () => {
    let context = useContext(Context);
    if (context === undefined) {
        throw new Error("useAuth must be used inside SupabaseAuthProvider");
    } else {
        return context;
    }
};
