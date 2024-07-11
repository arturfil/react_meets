"use client"

import { useAuthStore } from "@/store/auth/auth.store";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function Signup() {
  const router = useRouter()
  const signUpUser = useAuthStore(state => state.signUpUser);
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: ""
  })

  function handelSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (user.password !== user.confirm_password) {
      toast.error("please make sure passwords match");
      return;
    }
    const {confirm_password,  ...obj} = user;
    signUpUser(obj); 
    router.push("/")
    toast.success("successfully signed up!")
  }

  return (
    <div className="mt-20">
      <div className="w-96 p-8 bg-gray-100 rounded-xl shadow h-[700px]">
        <h2 className="text-2xl mb-6 font-bold justify-center flex">Signup</h2>

        <form onSubmit={handelSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={user.email}
              onChange={e => setUser({...user, email: e.target.value})}
              type="text"
              name="email"
              className="w-full p-2 border rounded-xl focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="first_name"
            >
              First Name
            </label>
            <input
              value={user.first_name}
              onChange={e => setUser({...user, first_name: e.target.value})}
              type="text"
              name="first_name"
              className="w-full p-2 border rounded-xl focus:outline-none focus:border-blue-500"
              placeholder="Enter your first name"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              value={user.last_name}
              onChange={e => setUser({...user, last_name: e.target.value})}
              type="text"
              name="first_name"
              className="w-full p-2 border rounded-xl focus:outline-none focus:border-blue-500"
              placeholder="Enter your last name"
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
              value={user.password}
              onChange={e => setUser({...user, password: e.target.value})}
              name="password"
              type="password"
              className="w-full p-2 border rounded-xl focus:outline-none focus:border-blue-500 mb-2"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              value={user.confirm_password}
              onChange={e => setUser({...user, confirm_password: e.target.value})}
              name="confirm_password"
              type="password"
              className="w-full p-2 border rounded-xl focus:outline-none focus:border-blue-500 mb-2"
              placeholder="Enter your password"
            />
          </div>

            <button className="w-full bg-gradient-to-r from-green-300 to-green-500 text-white p-2 rounded-xl hover:bg-green-600 focus:outline-none">
             Signup 
            </button>
        </form>
      </div>
    </div>
  );
}
