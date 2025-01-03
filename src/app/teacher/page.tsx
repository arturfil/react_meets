'use client';

import React, { useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import TeacherProfile from '@/components/layouts/TeacherProfile';
import { useAuthStore } from '@/store/auth/auth.store';
import { useRequestStore } from '@/store/requests/requests.store';
import TeacherRequest from '@/components/layouts/TeacherRequest';

function TeacherPage() {
  const user = useAuthStore((state) => state.user);
  const getUserByToken = useAuthStore((state) => state.getUserByToken);

  const getRequestById = useRequestStore((state) => state.getRequestById);

  useEffect(() => {
    getUserByToken();
  }, [getUserByToken]);

  useEffect(() => {
    if (!user || !user.id) return;
    getRequestById(user?.id);
  }, [getRequestById, user]);

  return (
    <div className='m-10 mt-16'>
      {user?.roles?.includes('teacher') ? (
        <TeacherProfile />
      ) : (
        <TeacherRequest />
      )}
    </div>
  );
}

export default AuthGuard(TeacherPage);
