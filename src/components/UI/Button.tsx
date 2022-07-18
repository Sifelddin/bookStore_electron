import React from 'react';

interface Props {
  children: string;
  handler?: (bool: boolean) => void;
}
const Button = ({ handler, children }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handler?.(true);
      }}
      className="uppercase inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-white shadow-md duration-75 hover:bg-green-400 w-full"
    >
      {children}
    </button>
  );
};

export default Button;
