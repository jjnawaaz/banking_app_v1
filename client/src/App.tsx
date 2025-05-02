import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import User from "./components/User";
import HomePage from "./components/HomePage";
import UserPage from "./components/UserRoute/UserPage";
import AdminPage from "./components/AdminRoute/AdminPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/userPage" element={<UserPage />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
