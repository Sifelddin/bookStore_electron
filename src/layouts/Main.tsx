import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props) => {
  return <div className="w-full h-full">{children}</div>;
};

export default Main;
