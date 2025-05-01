import { useState } from "react";
import UserLogin from "./UserRoute/UserLogin";
import UserSignUp from "./UserRoute/UserSignup";

const User = () => {
  const [checker, setChecker] = useState(false);
  const [checker1, setChecker1] = useState(false);
  return (
    <div className="grid grid-cols-1 mt-10 gap-10 mx-auto container">
      <span
        onClick={() => (
          setChecker((prev) => !prev), setChecker1((prev) => !prev)
        )}
        className="flex justify-center text-2xl font-bold italic"
      >
        {checker1
          ? "Create a new account? click here.."
          : "Already a user? click here"}
      </span>
      {checker ? <UserLogin /> : <UserSignUp />}
    </div>
  );
};

export default User;
