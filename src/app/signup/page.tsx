'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/store/auth/auth.store';

export default function Signup() {
  const router = useRouter();
  const signUpUser = useAuthStore((state) => state.signUpUser);
  const [user, setUser] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  });

  function handelSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (user.password !== user.confirm_password) {
      toast.error('please make sure passwords match');
      return;
    }
    const { confirm_password, ...obj } = user;
    signUpUser(obj);
    router.push('/');
    toast.success('successfully signed up!');
  }

  return (
    <div className='mt-20'>
      <div className='h-[700px] w-96 rounded-xl bg-gray-100 p-8 shadow dark:bg-[#24272b] dark:text-gray-800'>
        <h2 className='mb-6 flex justify-center text-2xl font-bold dark:text-gray-400'>
          Signup
        </h2>

        <form onSubmit={handelSubmit}>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700 dark:text-gray-100'
              htmlFor='email'
            >
              Email
            </label>
            <input
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              type='text'
              name='email'
              className='w-full rounded-xl border p-2 focus:border-blue-500 focus:outline-none'
              placeholder='Enter your email'
            />
          </div>

          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700 dark:text-gray-100'
              htmlFor='first_name'
            >
              First Name
            </label>
            <input
              value={user.first_name}
              onChange={(e) =>
                setUser({
                  ...user,
                  first_name: e.target.value,
                })
              }
              type='text'
              name='first_name'
              className='w-full rounded-xl border p-2 focus:border-blue-500 focus:outline-none'
              placeholder='Enter your first name'
            />
          </div>

          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700 dark:text-gray-100'
              htmlFor='last_name'
            >
              Last Name
            </label>
            <input
              value={user.last_name}
              onChange={(e) =>
                setUser({
                  ...user,
                  last_name: e.target.value,
                })
              }
              type='text'
              name='first_name'
              className='w-full rounded-xl border p-2 focus:border-blue-500 focus:outline-none'
              placeholder='Enter your last name'
            />
          </div>

          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700 dark:text-gray-100'
              htmlFor='password'
            >
              Password
            </label>
            <input
              value={user.password}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              name='password'
              type='password'
              className='mb-2 w-full rounded-xl border p-2 focus:border-blue-500 focus:outline-none'
              placeholder='Enter your password'
            />
          </div>

          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700 dark:text-gray-100'
              htmlFor='password'
            >
              Confirm Password
            </label>
            <input
              value={user.confirm_password}
              onChange={(e) =>
                setUser({
                  ...user,
                  confirm_password: e.target.value,
                })
              }
              name='confirm_password'
              type='password'
              className='mb-2 w-full rounded-xl border p-2 focus:border-blue-500 focus:outline-none'
              placeholder='Enter your password'
            />
          </div>

          <button className='w-full rounded-xl bg-gradient-to-r from-green-300 to-green-500 p-2 text-white hover:bg-green-600 focus:outline-none'>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
