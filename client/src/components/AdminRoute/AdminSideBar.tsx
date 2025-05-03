const AdminSideBar = () => {
  return (
    <div className="flex flex-col items-center justify-evenly  h-[calc(100vh-48px)] border-r-4 border-r-black text-white bg-black shadow-2xl/100 shadow-gray-400 ">
      <div className="shadow-xl shadow-white w-[85%] flex justify-center py-2 hover:bg-white hover:text-black cursor-pointer">
        Approvals
      </div>
      <div className="shadow-xl shadow-white  w-[85%] flex justify-center py-2 hover:bg-white hover:text-black cursor-pointer">
        Users
      </div>
      <div className="shadow-xl shadow-white  w-[85%] flex justify-center py-2 hover:bg-white hover:text-black cursor-pointer">
        Profile
      </div>
    </div>
  );
};

export default AdminSideBar;
