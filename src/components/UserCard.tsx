import React from 'react';

import { CircleUserRound } from 'lucide-react';

import { User } from '@/interfaces/User';

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <div className="flex h-40 w-60 rounded-xl bg-gray-100 p-2 shadow-md hover:shadow-lg">
      <div className="mx-auto flex flex-col justify-center align-middle">
        <CircleUserRound
          size={50}
          className="mx-auto flex justify-center"
        />
        <h2 className="flex text-center align-middle text-lg font-bold">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}
