import React from 'react';

interface ErrSpanProps {
  children: string | undefined;
}

const ErrorSpan = ({ children }: ErrSpanProps) => {
  return <span className="text-red-600 text-xs"> {children} </span>;
};

export default ErrorSpan;
