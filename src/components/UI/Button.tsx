import React from 'react';

interface Props {
  children: string;
  handler: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const Button = ({ handler, children }: Props) => {
  let classes =
    'mb-2 md:mb-0 border px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg uppercase ';
  switch (children) {
    case 'Edit Order':
      classes =
        'py-1 px-2 text-white text-xs font-bold bg-blue-500 border-blue-500 hover:bg-blue-600 rounded-lg shadow-sm hover:shadow-lg uppercase ';
      break;
    case 'delete':
      classes += ' bg-red-500 border-red-500 hover:bg-red-600 ';
      break;
    case 'update':
    case 'put':
      classes += 'bg-blue-500 border-blue-500 hover:bg-blue-600';
      break;
    case 'Cancel':
      classes += ' bg-stone-500 border-stone-500 hover:bg-stone-600';
      break;
    case 'create':
      classes += 'bg-green-500 border-green-500 hover:bg-green-600';
      break;
    case 'confirm':
      classes += 'bg-lime-500 border-lime-500 hover:bg-lime-600';
      break;
    default:
      classes = '';

    // "uppercase inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-white shadow-md duration-75 hover:bg-green-400 w-full"
  }
  return (
    <button onClick={handler} className={classes}>
      {children}
    </button>
  );
};

export default Button;
