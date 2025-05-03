import { useEffect, useState } from "react";
import AdminLogin from "./AdminRoute/AdminLogin";
import AdminSignup from "./AdminRoute/AdminSignup";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [checker, setChecker] = useState(false);
  const [checker1, setChecker1] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  });

  useEffect(() => {
    if (token) {
      navigate("/adminPage");
    }
  }, [token, navigate]);
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
