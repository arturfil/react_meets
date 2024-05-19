import { User } from '@/interfaces/User'
import React from 'react'

interface Props {
    user: User; 
}

export default function UserCard({user}: Props) {
  return (
    <div className="w-60 p-2 bg-gray-100 rounded-xl shadow-md hover:shadow-lg">
        <h2 className="font-bold text-lg">
            Name: {user.first_name} {user.last_name}
        </h2>
        <p className="text-sm text-gray-600">
            Contact Info: {user.email}
        </p>
    </div> 
  )
}

