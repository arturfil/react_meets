"use client";

import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function TeacherPage() {
  return (
    <div className="mt-16 m-10">

     <Image className="rounded-3xl flex justify-center mx-auto mb-10" 
        src="/tutor-image.jpg" 
        width={600} height={400} alt="tutors" 
     />

      <div className="flex flex-col">
        <h2 className="font-bold text-2xl w-8/12 p-4 mx-auto bg-green-200 rounded-md">
          If you want to teach courses first create a user account and then
          request your teacher account here.
        </h2>

        <br />

        <h2 className="font-bold w-8/12 mx-auto p-4 bg-green-300 rounded-md">
          You already requeseted teacher access? Please wait till the verification
          process is completed or get in contact with support.
        </h2>

        <Button asChild className="mt-5 w-[200px] flex justify-center mx-auto">
          <Link href="/requests/createrequests">Request Access</Link>
        </Button>
      </div>
    </div>
  );
}

export default AuthGuard(TeacherPage);
