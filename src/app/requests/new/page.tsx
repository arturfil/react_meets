'use client';

import React, { useEffect, useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth/auth.store';
import { useRequestStore } from '@/store/requests/requests.store';
import NewRequestLayout from '@/components/layouts/NewRequestLayout';

function Requests() {
  const createRequest = useRequestStore((state) => state.createRequest);
  const getRequestById = useRequestStore((state) => state.getRequestById);
  const request = useRequestStore((state) => state.request);
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ((loading && !user) || !user?.id) {
      return;
    }
    // we are caching the user, there is no point
    // on re-fetching the user by token
    getRequestById(user?.id);
    setLoading(false);
  }, [user?.id, getRequestById, loading, user]);

  function handleRequest() {
    console.log(user);
    if (!user || !user.id) return;
    setLoading(false);
    createRequest({
      id: user?.id,
      user_id: user.id,
      type: 'teach request',
    });
  }

  if (loading) {
    return (
      <div className='ml-10 mt-16'>
        <h2 className='text-3xl font-bold'>Loading ...</h2>
        <form action='submitCourse'></form>
      </div>
    );
  } else if (request) {
    return <NewRequestLayout />;
  } else {
    return (
      <div className='ml-10 mt-16'>
        <div>
          <h2 className='my-5 w-8/12 text-2xl font-bold'>Requests</h2>

          <h2 className='font w-8/12'>
            You are making a request to the administrator, for the rights to
            provide courses. Allow 1 to 2 business day to process this request.
            If you experience some trouble, please get in contact with support{' '}
            <span className='font-bold'>support@meetings.com</span>
            <br />
            <br />
            Thanks,
          </h2>
        </div>

        <div className='mt-5'>
          <h2 className='text-lg font-bold'>Make request</h2>
          <Button className='mt-2 h-[30px]' onClick={handleRequest}>
            Create Request
          </Button>
        </div>
      </div>
    );
  }
}

export default AuthGuard(Requests);
