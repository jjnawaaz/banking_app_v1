import { useState } from "react";
import AdminLogin from "./AdminRoute/AdminLogin";
import AdminSignup from "./AdminRoute/AdminSignup";

const Admin = () => {
  const [checker, setChecker] = useState(false);
  const [checker1, setChecker1] = useState(false);
  return (
    <div className="grid grid-cols-1 mt-10 gap-10 mx-10">
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
      {checker ? <AdminLogin /> : <AdminSignup />}
    </div>
  );
};

export default Admin;
