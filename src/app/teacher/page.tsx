'use client';

import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Settings } from 'lucide-react';

import AuthGuard from '@/components/AuthGuard';
import { Button } from '@/components/ui/button';

import { useAuthStore } from '@/store/auth/auth.store';
import { useRequestStore } from '@/store/requests/requests.store';

function TeacherPage() {
  const user = useAuthStore((state) => state.user);
  const getUserByToken = useAuthStore((state) => state.getUserByToken);

  const getRequestById = useRequestStore((state) => state.getRequestById);
  const request = useRequestStore((state) => state.request);

  useEffect(() => {
    getUserByToken();
  }, [getUserByToken]);

  useEffect(() => {
    if (!user || !user.id) return;
    getRequestById(user?.id);
  }, [getRequestById, user]);

  return (
    <div className="m-10 mt-16">
      {user?.roles?.includes('teacher') ? (
        <Profile />
      ) : (
        <div className="flex flex-col">
          <Image
            className="mx-auto mb-10 flex justify-center rounded-3xl"
            src="/tutor-image.jpg"
            width={600}
            height={400}
            alt="tutors"
          />

          <h2 className="mx-auto w-8/12 rounded-md bg-green-200 p-4 text-2xl font-bold">
            If you want to teach courses first create a user account and then
            request your teacher account here.
          </h2>

          <br />

          <h2 className="mx-auto w-8/12 rounded-md bg-green-300 p-4 font-bold">
            You already requeseted teacher access? Please wait till the
            verification process is completed or get in contact with support.
          </h2>

          {request ? (
            <h2 className="mt-5 flex justify-center text-lg font-bold">
              Your request has been sent already!
            </h2>
          ) : (
            <Button
              asChild
              className="mx-auto mt-5 flex w-[200px] justify-center"
            >
              <Link href="/requests/createrequests">Request Access</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function Profile() {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <div className="container flex h-[600px] w-[300px] flex-col rounded-lg border-gray-400 p-6 sm:w-[500px] sm:border-[1px] md:w-[600px] md:border-[1px] lg:w-[800px] lg:border-[1px]">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          <h2 className="text-[40px] font-semibold">
            {user?.first_name} {user?.last_name}
          </h2>
          <p className="content-end">{user?.email}</p>
          <div className="mb-4 mr-10 flex place-self-end">
            <h2 className="mr-3">Edit</h2>
            <Link href="/teacher/edit">
              <Settings />
            </Link>
          </div>
        </div>
        <hr className="my-2 border-gray-400" />
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          <h2>Roles</h2>
          <div className="flex space-x-1">
            <ul>{user?.roles?.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
          <h2 className="w-[100px] text-primary">Request new roles</h2>
        </div>
        <hr className="my-2 border-gray-400" />
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          <h2>Start Work Time</h2>
          <p>8:00 AM</p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          <h2>End Work Time</h2>
          <p>6:00 PM</p>
        </div>
        <hr className="my-2 border-gray-400" />
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          <h2>Subjects Taught</h2>
          <p>Test</p>
        </div>
      </div>
    </>
  );
}

export default AuthGuard(TeacherPage);
