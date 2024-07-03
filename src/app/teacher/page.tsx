"use client";

import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "@/interfaces/User";
import { useAuthStore } from "@/store/auth/auth.store";
import { CircleUserIcon, CircleUserRound, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function TeacherPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="mt-16 m-10">
      {user?.roles?.includes("teacher") ? (
        <Profile props={user} />
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

          <Button
            asChild
            className="mt-5 w-[200px] flex justify-center mx-auto"
          >
            <Link href="/requests/createrequests">Request Access</Link>
          </Button>
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
        <div className="grid grid-cols-3 ">
          <h2 className="font-semibold text-[40px]">
            {user?.first_name} {user?.last_name}
          </h2>
          <p className="content-end">{user?.email}</p>
        </div>
        <hr className="border-gray-400 my-2" />
        <div className="grid grid-cols-3">
          <h2>Roles</h2>
          <div className="flex space-x-1">
            <ul>{user?.roles?.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
          <Button asChild className="w-[100px]" variant="outline">
            <Link href="/teacher/addSubject">
              Edit <Pencil className="ml-4" />
            </Link>
          </Button>
        </div>
        <hr className="border-gray-400 my-2" />
        <div className="grid grid-cols-3">
          <h2>Start Work Time</h2>
          <p>8:00 AM</p>
          <Button asChild className="w-[100px]" variant="outline">
            <Link href="/teacher/addSubject">
              Edit <Pencil className="ml-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-3">
          <h2>End Work Time</h2>
          <p>6:00 PM</p>
        </div>
        <hr className="border-gray-400 my-2" />
        <div className="grid grid-cols-3">
          <h2>Subjects Taught</h2>
          <p>Test</p>
          <Button asChild className="w-[100px]" variant="outline">
            <Link href="/teacher/addSubject">
              Edit <Pencil className="ml-4" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export default AuthGuard(TeacherPage);
