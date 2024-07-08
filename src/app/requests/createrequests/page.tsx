"use client"

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth/auth.store";
import { useRequestStore } from "@/store/requests/requests.store";
import { useRouter } from "next/navigation";
import React from "react";

export default function Requests() {
  const createRequest = useRequestStore(state => state.createRequest);
  const user = useAuthStore(state => state.user)

  const router = useRouter();

  function handleRequest() {
    console.log(user);
    if (!user || !user.id) return;
    createRequest({id: user?.id, status: "pending"})
    router.push("/");
  }

  return (
    <div className="mt-16 ml-10">

      <div>
      <h2 className="font-bold text-2xl w-8/12 my-5">Requests</h2>

      <h2 className="font w-8/12">
        You are making a request to the administrator, for the rights to provide
        courses. Allow 1 to 2 business day to process this request. If you
        experience some trouble, please get in contact with support{" "}
        <span className="font-bold">support@meetings.com</span>
        <br />
        <br />
        Thanks,
      </h2>
      </div>

      <div className="mt-5">
        <h2 className="font-bold text-lg">Make request</h2>
        <Button className="h-[30px] mt-2" onClick={handleRequest}>
            Create Reqeuset
        </Button>
      </div>
    </div>
  );
}
