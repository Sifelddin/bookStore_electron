import React from 'react';

interface ToListProps {
  link: string;
  children: string;
}

const LinkSpan = ({ link, children }: ToListProps) => {
  const regExp = /\d+/;
  let classes = '';
  if (regExp.test(link)) {
    classes = 'text-blue-500 hover:text-blue-700';
  } else {
    switch (link) {
      case 'new':
        classes =
          'flex justify-center items-center px-2 py-2 bg-blue-700 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-gray-100 focus:ring ring-gray-100 disabled:opacity-25 transition ease-in-out duration-150 w-fit';
        break;
      case '/admin/suppliers':
        classes =
          'uppercase text-center inline-block rounded-md bg-gray-700 px-6 py-2 font-semibold text-white shadow-md duration-75 hover:bg-gray-500 w-full';
        break;

      default:
        classes = '';
    }
  }

  return <span className={classes}>{children}</span>;
};

export default LinkSpan;
