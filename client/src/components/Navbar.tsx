import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CiBank } from "react-icons/ci";

const Navbar = ({ token }: { token: string | null }) => {
  const storageToken = token;
  useEffect(() => {}, [storageToken]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black text-white shadow">
        {/* For PC display */}
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <Link to="/">
            <div className="flex gap-2 items-center">
              <span className="text-md font-semibold">
                <CiBank className="size-8 hover:text-gray-400 transition ease-in-out" />
              </span>
              <span className="text-lg font-semibold">HDFCI Bank</span>
            </div>
          </Link>
          {storageToken ? (
            <></>
          ) : (
            <div className="flex space-x-4 font-semibold">
              <Link to="/admin">
                <span className="hover:text-gray-400 transition ease-in">
                  Admin
                </span>
              </Link>
              <span> / </span>
              <Link to="/user">
                <span className="hover:text-gray-400 transition ease-in">
                  User
                </span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
