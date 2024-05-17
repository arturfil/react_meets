export default function Signup() {
  return (
    <div className="mt-20">
      <div className="w-96 p-8 bg-gray-100 rounded-xl shadow h-[500px]">
        <h2 className="text-2xl mb-6 font-bold justify-center flex">Signup</h2>

        <form>
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

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirm sPassword
            </label>
            <input
              name="confirm_password"
              type="password"
              className="w-full p-2 border rounded-xl focus:outline-none focus:border-blue-500 mb-2"
              placeholder="Enter your password"
            />
          </div>

          <button
            className="
            w-full bg-gradient-to-r 
            from-cyan-500 to-blue-500 
            text-white p-2 rounded-xl 
            hover:bg-green-600 focus:outline-none"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
