"use client"

import { useAuthStore } from '@/store/auth/auth.store'
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthGuard(Component: React.FC<any>) { // remember to change to any if needed

  return function AuthGuard(props: any) {
        const isLoggedIn = useAuthStore(state => state.isLoggedIn());

        useEffect(() => {
            if (!isLoggedIn) {
                redirect("/login")
            }
        }, [])

        return isLoggedIn ? <Component {...props} /> : null;
    } 
}
