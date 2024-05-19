"use client"

import useHasMounted from '@/hooks/hasMounted';
import { useAuthStore } from '@/store/auth/auth.store'
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthGuard(Component: React.FC<any>) { // remember to change to any if needed

  return function AuthGuard(props: any) {
        const isLoggedIn = useAuthStore(state => state.isLoggedIn());
        const hasMounted = useHasMounted();

        useEffect(() => {
            if (!isLoggedIn) {
                redirect("/login")
            }
        }, [])

        if (!hasMounted) return null;

        return isLoggedIn ? <Component {...props} /> : null;
    } 
}
