import React from 'react';

interface ErrSpanProps {
  children: string;
}

const ErrorSpan = ({ children }: ErrSpanProps) => {
  return <span className="text-red-600 text-sm"> {children} </span>;
};

export default ErrorSpan;
