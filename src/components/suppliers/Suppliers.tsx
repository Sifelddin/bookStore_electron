import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useConfirmation, useModal } from '../../contexts/ConfirmContext';
import { fetchData, postData } from '../../hooks';
import Modal from '../modal';
import LinkSpan from '../UI/LinkSpan';
import Spinner from '../UI/Spinner';
import Th, { Td } from '../UI/Th';
import { ISupplier } from './interfaces';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState({ loading: true, data: null });
  const [supplier, setSupplier] = useState<string | null>(null);
  const { confirmed, setConfirmed } = useConfirmation();
  const { setShowModal } = useModal();
  console.log(confirmed);

  useEffect(() => {
    if (supplier && confirmed) {
      postData('delete', supplier).then(() => fetchData('/api/suppliers', setSuppliers));
      setConfirmed?.(false);
      console.log('deleted');
    } else {
      fetchData('/api/suppliers', setSuppliers);
    }
  }, [supplier, confirmed]);

  const { loading, data } = suppliers;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="py-12 col-span-4 self-center h-screen ">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <Link to="new">
              <LinkSpan link="new">Create new Supplier</LinkSpan>
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
                        <Th>Id</Th>
                        <Th>ContactName</Th>
                        <Th>actions</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        (data['hydra:member'] as ISupplier[]).map((sup: ISupplier) => {
                          return (
                            <tr key={sup.id}>
                              <Td>{sup.id}</Td>
                              <Td>{sup.contactName}</Td>
                              <td className="grid grid-cols-2 items-center px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link to={`${sup.id}`} state={sup}>
                                  <LinkSpan link={`${sup.id}`}>edit</LinkSpan>
                                </Link>
                                {sup.books.length > 0 || (
                                  <button
                                    onClick={() => {
                                      setShowModal?.(true);
                                      setSupplier(sup['@id']);
                                    }}
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
      <Modal method="Delete" />
    </div>
  );
};

export default Suppliers;
