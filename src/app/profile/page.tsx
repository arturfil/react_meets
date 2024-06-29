"use client";

import AuthGuard from "@/components/AuthGuard";
import { useAuthStore } from "@/store/auth/auth.store";
import React from "react";

function Profile() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="mt-16 ml-10">
      <h2 className="font-bold text-4xl text-center my-5">Profile Page</h2>

      <h2>
        {user?.first_name} {user?.last_name}
      </h2>

        <h2>Roles user has:</h2>      
      {user?.roles && user?.roles.map((r) => <h2 key={r}>{r}</h2>)}
    </div>
  );
}

export default AuthGuard(Profile);
