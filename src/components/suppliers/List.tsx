import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useConfirmation, useModal } from '../../contexts/ConfirmContext';
import { fetchData, postData } from '../../hooks';
import LinkSpan from '../UI/LinkSpan';
import ListFrame from '../UI/ListFrame';
import Spinner from '../UI/Spinner';
import Th, { Td } from '../UI/Th';
import { ContentList } from '../interfaces';
import Pagination from '../UI/Pagination';
import Title from '../UI/Title';

const Suppliers = () => {
  const [url, setUrl] = useState('/api/v2/suppliers');
  const [suppliers, setSuppliers] = useState<ContentList>({ loading: true, data: undefined });
  const [supplier, setSupplier] = useState<string | null>(null);
  const { confirmed, setConfirmed } = useConfirmation();
  const { setShowModal } = useModal();
  const navigate = useNavigate();
  const deleteMethode = 'delete';
  useEffect(() => {
    fetchData(url, setSuppliers).catch((e) =>
      e.response.data.code === 401 ? navigate('/', { replace: true }) : console.log(e)
    );
  }, [url]);

  useEffect(() => {
    if (supplier && confirmed) {
      postData(deleteMethode, supplier).then(() => fetchData(url, setSuppliers));
      setConfirmed?.(false);
    }
  }, [supplier, confirmed]);

  const { loading, data } = suppliers;

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Title>List of Suppliers</Title>
      <ListFrame method={deleteMethode} data={data} newItem="Supplier">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th>Id</Th>
              <Th>ContactName</Th>
              <Th>actions</Th>
            </tr>
          </thead>
          <tbody>
            {data?.['hydra:member'].map((sup) => {
              return (
                'contactName' in sup && (
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
                )
              );
            })}
          </tbody>
        </table>
        <Pagination data={data} setPageUrl={setUrl} />
      </ListFrame>
    </>
  );
};

export default Suppliers;
