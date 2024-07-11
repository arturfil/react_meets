"use client";

import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth/auth.store";
import { useRequestStore } from "@/store/requests/requests.store";
import { Pencil, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

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
    <div className="mt-16 m-10">
      {user?.roles?.includes("teacher") ? (
        <Profile />
      ) : (
        <div className="flex flex-col">
          <Image
            className="rounded-3xl flex justify-center mx-auto mb-10"
            src="/tutor-image.jpg"
            width={600}
            height={400}
            alt="tutors"
          />

          <h2 className="font-bold text-2xl w-8/12 p-4 mx-auto bg-green-200 rounded-md">
            If you want to teach courses first create a user account and then
            request your teacher account here.
          </h2>

          <br />

          <h2 className="font-bold w-8/12 mx-auto p-4 bg-green-300 rounded-md">
            You already requeseted teacher access? Please wait till the
            verification process is completed or get in contact with support.
          </h2>

          {request ? (
            <h2 className="flex justify-center mt-5 text-lg font-bold">
              Your request has been sent already!
            </h2>
          ) : (
            <Button
              asChild
              className="mt-5 w-[200px] flex justify-center mx-auto"
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
      <div className="flex flex-col border-gray-400 border-[1px] p-6 container sm:w-[400px] md:w-[600px] lg:w-[800px] h-[600px] rounded-lg">
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3">
          <h2 className="font-semibold text-[40px]">
            {user?.first_name} {user?.last_name}
          </h2>
          <p className="content-end">{user?.email}</p>
          <div className="place-self-end mr-10 mb-4 flex">
            <h2 className="mr-3">Edit</h2>
            <Link href="/teacher/edit">
            <Settings />
            </Link>
          </div>
        </div>
        <hr className="border-gray-400 my-2" />
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3">
          <h2>Roles</h2>
          <div className="flex space-x-1">
            <ul>{user?.roles?.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
          <h2 className="w-[100px] text-primary">
            Request new roles
          </h2>
        </div>
        <hr className="border-gray-400 my-2" />
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3">
          <h2>Start Work Time</h2>
          <p>8:00 AM</p>
        </div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3">
          <h2>End Work Time</h2>
          <p>6:00 PM</p>
        </div>
        <hr className="border-gray-400 my-2" />
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3">
          <h2>Subjects Taught</h2>
          <p>Test</p>
        </div>
      </div>
    </>
  );
}

export default AuthGuard(TeacherPage);
