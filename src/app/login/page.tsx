"use client";

import { useAuthStore } from "@/store/auth/auth.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Login() {
  const loginUser = useAuthStore((state) => state.loginUser);
  const loginResponse = useAuthStore((state) => state.error);

  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { email, password } = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    try {
        await loginUser(email.value, password.value)
        email.value = ""
        password.value = ""

    } catch (error) {
        
    }

  }

  return (
    <div className="mt-20">
      <div className="w-96 p-8 bg-gray-100 rounded-xl shadow h-[500px]">

        <h2 className="text-2xl mb-6 font-bold justify-center flex">Login</h2>

        {loginResponse && loginResponse.error ? <h2>{loginResponse.message}</h2> : ""} 

        <form onSubmit={handleLogin}>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                className="w-full p-2 border rounded-xl focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                className="w-full p-2 border rounded-xl focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter your password"
              />
            </div>

            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 rounded-xl hover:bg-green-600 focus:outline-none">
              Login
            </button>

            <div className="mt-4">
              <Link href="/signup" className=""
              >
                If you don't have an account yet click here
              </Link>
            </div>
        </form>

      </div>
    </div>
  );
}
