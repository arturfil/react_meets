'use client';

import React, { useEffect, useState } from 'react';
import { Check, Clipboard } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuthStore } from '@/store/auth/auth.store';
import { User } from '@/interfaces/User';

function Users() {
  const users = useAuthStore((state) => state.users);
  const getAllUsers = useAuthStore((state) => state.getAllUsers);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <div className='container mx-auto mb-10 mt-16 h-full justify-center'>
      <div className='flex'>
        <h2 className='my-5 justify-center text-center text-3xl font-bold'>
          Users
        </h2>
      </div>
      <UsersTable users={users} />
    </div>
  );
}

export default AuthGuard(Users);

interface UserProps {
  users: User[];
}

const UsersTable = ({ users }: UserProps) => {
  const [focusedUser, setFocusedUser] = useState('');

  return (
    <div className=''>
      <Table className='max-sm:hidden'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>ID</TableHead>
            <TableHead className=''>User</TableHead>
            <TableHead className=''>Email</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead className=''>Copy ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>
                <p className='w-[100px] overflow-clip overflow-ellipsis text-nowrap'>
                  {user.id}
                </p>
              </TableCell>
              <TableCell>
                {user.first_name} {user.last_name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.roles?.map((r: any) => <p key={r.id}>{r}</p>)}
              </TableCell>
              <TableCell className='cursor-pointer text-right'>
                {focusedUser === user.id ? (
                  <Check />
                ) : (
                  <Clipboard
                    onClick={() => {
                      navigator.clipboard.writeText(user.id!);
                      setFocusedUser(user.id!);
                      setTimeout(() => {
                        setFocusedUser('');
                      }, 1000);
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
