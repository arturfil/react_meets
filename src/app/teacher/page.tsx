"use client"

import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";
import React from "react";

function TeacherPage() {

  return (
    <div className="mt-16 ml-10">
      <div className="">
        <h2 className="font-bold text-2xl flex w-8/12">
          If you want to teach courses first create a user account and then
          request your teacher account here.
        </h2>
        <br />
        <h2 className="font-bold w-8/12">
          You already requeset teacher access? Please wait till the verification
          process is completed or get in contact with support.
        </h2>
        <Link href="/requests/createrequests" className="mt-5 text-white text-sm bg-orange-600 px-3 py-1 rounded-lg">
          Request Access
        </Link>
      </div>
    </div>
  );
}

export default AuthGuard(TeacherPage);
