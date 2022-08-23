import React from 'react';

const Title = ({ children }: { children: string }) => {
  return <h1 className="text-center text-2xl font-medium font-mono mt-6">{children}</h1>;
};

export default Title;
