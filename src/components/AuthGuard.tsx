"use client"

import { useAuthStore } from '@/store/auth/auth.store'
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthGuard(Component: any) { // remember to change to any if needed

  return function AuthGuard(props: any) {
        const isLoggedIn = useAuthStore(state => state.isLoggedIn());

        useEffect(() => {
            console.log("use efect here ->")
            console.log(isLoggedIn)
            if (!isLoggedIn) {
                redirect("/login")
            }
        }, [])

        if (!isLoggedIn) return null;

        return <Component {...props} />;
    } 
}
