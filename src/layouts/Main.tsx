import React from 'react';
import { useAuth } from '../contexts/ConfirmContext';

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props) => {
  const { data } = useAuth();

  console.log(data);

  return <div className="w-full ml-60 ">{children}</div>;
};

export default Main;
