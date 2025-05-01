import { Link } from "react-router-dom";

const Navbar1 = () => {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-amber-50 shadow border-amber-500 border-2">
        {/* For PC display */}
        <div className="container mx-auto flex items-center justify-between px-4 py-4 border-2 border-black">
          <Link to="/">
            <div className="flex gap-2 items-center">
              <span className="text-md font-semibold">WebsiteLogo</span>
              <span className="text-lg font-semibold">Name</span>
            </div>
          </Link>
          <div className="flex space-x-4 font-semibold">
            <Link to="/admin">
              <span>Admin</span>
            </Link>
            <span> / </span>
            <Link to="/user">
              <span>User</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar1;
