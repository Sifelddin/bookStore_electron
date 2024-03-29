import React from 'react';

interface ToListProps {
  link: string;
  children: string[] | string;
}

const LinkSpan = ({ link, children }: ToListProps) => {
  const regExp = /\d+/;
  let classes = '';

  // classes for the link 'edit' in the list
  if (regExp.test(link)) {
    classes = 'text-blue-500 hover:text-blue-700';
  } else {
    switch (link) {
      // classes of the create link in the list page
      case 'new':
        classes =
          'flex justify-center items-center px-2 py-2 bg-blue-700 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-gray-100 focus:ring ring-gray-100 disabled:opacity-25 transition ease-in-out duration-150 w-fit';
        break;
      // classes of return link in the form "create/update"
      case '/admin/suppliers':
      case '/admin/categories':
      case '/admin/books':
      case 'users/employees':
      case 'users/clients':
        classes =
          'uppercase text-center inline-block rounded-full bg-gray-700 px-6 py-2 font-semibold text-white shadow-md duration-75 hover:bg-gray-500 w-full';
        break;

      default:
        classes = '';
    }
  }

  return <span className={classes}>{children}</span>;
};

export default LinkSpan;
