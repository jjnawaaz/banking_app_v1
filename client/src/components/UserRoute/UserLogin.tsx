import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleState = () => {
      setCheck(false);
      setCheck1(false);
    };
    window.addEventListener("click", handleState);

    return () => window.removeEventListener("click", handleState);
  }, [check, check1]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.current?.value || !password.current?.value) {
      setCheck(true);
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: email.current?.value,
        password: password.current?.value,
      });
      if (response.data) {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/adminPage");
      }
    } catch (err) {
      console.log(err);
      setCheck1(true);
    }
  };

  return (
    <>
      <div className="w-full mx-auto flex items-center justify-center">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg w-full ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 flex justify-center mt-8">
              User Sign In
            </h3>
            <div className="flex flex-col items-center">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                ref={email}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5"
              />
            </div>
            <div className="flex flex-col items-center">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="email"
                ref={password}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 "
              />
            </div>
            <div className="flex justify-center">
              <button className="rounded-md bg-blue-400 text-white w-[50%] mb-5 h-8">
                Sign In
              </button>
            </div>
          </form>
          {check ? (
            <span className="flex justify-center font-semibold text-red-500">
              Enter All Details
            </span>
          ) : (
            <></>
          )}
          {check1 ? (
            <span className="flex justify-center font-semibold text-red-500">
              Invalid Email or Password
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default UserLogin;
