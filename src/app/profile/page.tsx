'use client';

import React, { useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import { useAuthStore } from '@/store/auth/auth.store';

function Profile() {
  const user = useAuthStore((state) => state.user);
  const getUserByToken = useAuthStore((state) => state.getUserByToken);

  useEffect(() => {
    getUserByToken();
  }, [getUserByToken]);

  return (
    <div className="ml-10 mt-16">
      <h2 className="my-5 text-center text-4xl font-bold">Profile Page</h2>

      <h2>
        {user?.first_name} {user?.last_name}
      </h2>

      <h2>Roles user has:</h2>
      {user?.roles && user?.roles.map((r) => <h2 key={r}>{r}</h2>)}
    </div>
  );
}

export default AuthGuard(Profile);
