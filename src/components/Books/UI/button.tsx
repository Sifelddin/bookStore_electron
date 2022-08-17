import React from 'react';

interface Props {
  children: string;
  color: string;
}

const Button = ({ children, color }: Props) => {
  let style = '';
  switch (color) {
    case 'red':
      style = ' bg-red-700 active:bg-red-800 hover:bg-red-900 ring-red-300 focus:border-red-900';
      break;
    case 'blue':
      style = ' bg-blue-700 active:bg-blue-800 hover:bg-blue-900 ring-blue-300 focus:border-blue-900';
      break;
    default:
      style = ' bg-gray-700 active:bg-gray-800 hover:bg-gray-900 ring-gray-300 focus:border-gray-900';
  }

  return (
    <button
      className={`${style} flex justify-center items-center px-4 py-2 mt-4 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest focus:outline-none focus:ring  disabled:opacity-25 transition ease-in-out duration-150`}
    >
      {children}
    </button>
  );
};

export default Button;
