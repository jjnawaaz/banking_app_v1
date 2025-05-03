import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";

const AdminPage = () => {
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
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div className="flex h-[calc(100vh-48px)]">
      <div className="w-[10%] h-[100%]">
        <AdminSideBar />
      </div>
      <div className=" h-[calc(100vh-48px)] w-full text-white">hello</div>
    </div>
  );
};

export default AdminPage;
