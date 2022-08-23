import React from 'react';
import { Link } from 'react-router-dom';

const NavList = () => {
  return (
    <nav className="relative select-none bg-indigo-900 lg:flex lg:items-stretch w-full">
      <div className="lg:flex lg:items-stretch lg:justify-center mx-auto">
        <Link
          to="../dashboard"
          className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
        >
          Item 1
        </Link>
        <Link
          to="../dashboard"
          className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
        >
          Item 2
        </Link>
        <Link
          to="../dashboard"
          className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
        >
          Item 3
        </Link>
      </div>
    </nav>
  );
};

export default NavList;
