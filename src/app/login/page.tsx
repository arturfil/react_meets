'use client';

import { FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth/auth.store';

export default function Login() {
  const loginUser = useAuthStore((state) => state.loginUser);
  const loginResponse = useAuthStore((state) => state.error);

  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { email, password } = event.target as typeof event.target & {
      email: {
        value: string;
      };
      password: {
        value: string;
      };
    };

    try {
      const response = await loginUser(email.value, password.value);
      email.value = '';
      password.value = '';
      if (response === 'success') {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='mt-20'>
      <div className='h-[500px] w-96 rounded-xl bg-gray-100 p-8 shadow dark:bg-[#24272b] dark:text-gray-800'>
        <h2 className='mb-6 flex justify-center text-2xl font-bold dark:text-gray-400'>
          Login
        </h2>

        {loginResponse && loginResponse.error ? (
          <div className='mb-2 rounded-md border-[1px] border-red-400 p-5 text-red-400'>
            <h2>{loginResponse.message}</h2>
          </div>
        ) : (
          ''
        )}

        <form onSubmit={handleLogin} className=''>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700 dark:text-gray-100'
              htmlFor='email'
            >
              Email
            </label>
            <input
              type='text'
              name='email'
              className='w-full rounded-2xl border p-2 focus:border-blue-500 focus:outline-none'
              placeholder='Enter your email'
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
              name='password'
              type='password'
              className='mb-2 w-full rounded-xl border p-2 focus:border-blue-500 focus:outline-none'
              placeholder='Enter your password'
            />
          </div>

          <button className='w-full rounded-xl bg-gradient-to-r from-green-300 to-green-500 p-2 text-white hover:bg-green-600 focus:outline-none'>
            Login
          </button>

          <div className='mt-4'>
            <Link href='/signup' className='text-blue-500'>
              If you don&apos;t have an account yet click here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
