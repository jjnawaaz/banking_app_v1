const AdminLogin = () => {
  return (
    <>
      <div className="w-full mx-auto flex items-center justify-center">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg w-full ">
          <form action="submit" className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 flex justify-center mt-8">
              Admin Sign In
            </h3>
            <div className="flex flex-col items-center">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Admin Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5"
              />
            </div>
            <div className="flex flex-col items-center">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Admin Password
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 "
              />
            </div>
            <div className="flex justify-center">
              <button className="rounded-md bg-blue-400 text-white w-[50%] mb-5 h-8">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
