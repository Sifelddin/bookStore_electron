import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../modal';
import LinkSpan from './LinkSpan';
import { Data } from '../interfaces';

interface Props {
  method: string;
  children: React.ReactNode;
  data?: Data;
  newItem: string;
}

const ListFrame = ({ method, children, data, newItem }: Props) => {
  return (
    <div className="py-12 col-span-4 self-center h-screen ">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <Link to="new">
              <LinkSpan link="new">Create new {newItem}</LinkSpan>
            </Link>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <span className="text-base sm:text-lg p-4 text-gray-700">Total : {data?.['hydra:totalItems']}</span>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal action={method} />
    </div>
  );
};

export default ListFrame;
