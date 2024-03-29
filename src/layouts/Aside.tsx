import React from 'react';
import { ImBooks } from 'react-icons/im';
import { MdCategory } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';

const Aside = () => {
  // const token = localStorage.getItem('token');
  // const decodededJWT = token && jwtDecode(token);

  const navLinkClasses =
    'text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out';

  return (
    <div className="font-poppins antialiased">
      <div
        id="sidebar"
        className="bg-white  md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out fixed top-0 bottom-0  "
        x-show="sidenav"
      >
        <div className="space-y-6 md:space-y-10 mt-10">
          <h1 className="font-bold text-4xl text-center md:hidden">
            D<span className="text-teal-600">.</span>
          </h1>
          <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
            Administrator<span className="text-teal-600">.</span>
          </h1>
          <div id="profile" className="space-y-3">
            <img
              src="https://pbs.twimg.com/profile_images/1467997254929854470/mDYbXoVl_400x400.jpg"
              alt="Avatar user"
              className="w-10 md:w-16 rounded-full mx-auto"
            />
            <div>
              <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">Eduard Pantazi</h2>
              <p className="text-xs text-gray-500 text-center">Administrator</p>
            </div>
          </div>

          <div id="menu" className="flex flex-col space-y-2">
            <NavLink
              to="dashboard"
              className={({ isActive }) => (isActive ? `${navLinkClasses} bg-teal-500 text-white` : navLinkClasses)}
            >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="">Dashboard</span>
            </NavLink>
            <NavLink
              to="suppliers"
              className={({ isActive }) => (isActive ? `${navLinkClasses} bg-teal-500 text-white` : navLinkClasses)}
            >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              <span className="cursor-pointer">Suppliers</span>
            </NavLink>
            <NavLink
              to="books"
              className={({ isActive }) => (isActive ? `${navLinkClasses} bg-teal-500 text-white` : navLinkClasses)}
            >
              <ImBooks className="ml-1 w-6 h-6 fill-current inline-block" />
              <span className="cursor-pointer text-sm">Books</span>
            </NavLink>

            <NavLink
              to="categories"
              className={({ isActive }) => (isActive ? `${navLinkClasses} bg-teal-500 text-white` : navLinkClasses)}
            >
              <MdCategory className="w-6 h-6 fill-current inline-block" />
              <span className="cursor-pointer text-sm">Categories</span>
            </NavLink>

            <NavLink
              to="users/privates"
              className={({ isActive }) => (isActive ? `${navLinkClasses} bg-teal-500 text-white` : navLinkClasses)}
            >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="">Privates</span>
            </NavLink>
            <NavLink
              to="users/professionals"
              className={({ isActive }) => (isActive ? `${navLinkClasses} bg-teal-500 text-white` : navLinkClasses)}
            >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="">Professionals</span>
            </NavLink>
            <NavLink
              to="users/employees"
              className={({ isActive }) => (isActive ? `${navLinkClasses} bg-teal-500 text-white` : navLinkClasses)}
            >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="">Employees</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Aside;
