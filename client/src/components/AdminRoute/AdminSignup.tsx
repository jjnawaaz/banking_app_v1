import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const adminName = useRef<HTMLInputElement>(null);
  const adminEmail = useRef<HTMLInputElement>(null);
  const adminPassword = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [existingUser, setExistingUser] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = adminName.current?.value;
    const email = adminEmail.current?.value;
    const password = adminPassword.current?.value;

    if (!name) {
      setName(true);
    }
    if (!email) {
      setEmail(true);
    }
    if (!password) {
      setPassword(true);
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/admin/signup", {
        name: name,
        username: email,
        password: password,
      });
      if (response.data) {
        localStorage.setItem('token',response.data.token)
        navigate('/userPage')
      }
    } catch (err) {
      console.log(err)
      setExistingUser(true);
    }
  };
  return (
    <>
      <div className="w-full mx-auto flex items-center justify-center container">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg w-full ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 flex justify-center mt-8">
              Admin Sign Up
            </h3>
            <div className="flex flex-col items-center">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Name
              </label>
              {name ? (
                <span className="font-semibold text-red-500 flex justify-start text-xs w-[70%] py-1">
                  Please Enter Name
                </span>
              ) : (
                <></>
              )}
              <input
                type="text"
                name="name"
                id="name"
                ref={adminName}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 "
              />
            </div>
            <div className="flex flex-col items-center">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Email
              </label>
              {email ? (
                <span className="font-semibold text-red-500 flex justify-start text-xs w-[70%] py-1">
                  Please Enter Email
                </span>
              ) : (
                <></>
              )}
              <input
                type="email"
                name="email"
                id="email"
                ref={adminEmail}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 "
              />
            </div>
            <div className="flex flex-col items-center">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Password
              </label>
              {password ? (
                <span className="font-semibold text-red-500 flex justify-start text-xs w-[70%] py-1">
                  Please Enter Password
                </span>
              ) : (
                <></>
              )}
              <input
                type="password"
                name="password"
                id="password"
                ref={adminPassword}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 "
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-md bg-blue-400 text-white w-[50%] mb-5 h-8"
              >
                Sign Up
              </button>
            </div>
          </form>
          {existingUser ? (
            <span className="flex justify-center text-red-500 font-semibold">
              Admin already exists !!!
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
