import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData, postData } from '../hooks';
import Spinner from '../Spinner';
import { ISupplier } from './interfaces';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState({ loading: true, data: null });
  useEffect(() => {
    fetchData('/api/suppliers', setSuppliers);
  }, []);
  const { loading, data } = suppliers;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="py-12 col-span-4 self-center h-screen ">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <Link
              className="flex justify-center items-center px-2 py-2 bg-blue-700 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-gray-100 focus:ring ring-gray-100 disabled:opacity-25 transition ease-in-out duration-150 w-fit"
              to="new"
            >
              Create new Supplier
            </Link>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <span className="text-base sm:text-lg p-4 text-gray-700">
                    Total : {data && data['hydra:totalItems']}
                  </span>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Id
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ContactName
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                        >
                          actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        (data['hydra:member'] as ISupplier[]).map((sup: ISupplier) => {
                          return (
                            <tr key={sup.id}>
                              <td className="px-2 py-2">{sup.id}</td>
                              <td className="px-2 py-2">{sup.contactName}</td>
                              <td className="grid grid-cols-2 items-center px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                <Link className="text-blue-500 hover:text-blue-700" to={`${sup.id}`}>
                                  edit
                                </Link>{' '}
                                {sup.books.length > 0 || (
                                  <button
                                    onClick={() => postData('delete', `/api/suppliers/${sup.id}`)}
                                    className="text-red-500 hover:text-red-700 cursor:pointer"
                                  >
                                    Delete
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
