import { User } from "@/interfaces/User";
import React from "react";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <div className="flex w-60 h-40 p-2 bg-gray-100 rounded-xl shadow-md hover:shadow-lg">
      <div className="flex flex-col align-middle justify-center mx-auto">
        <h2 className="font-bold text-center text-lg flex align-middle">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}
