import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import User from "./components/User";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
