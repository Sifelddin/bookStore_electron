import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal, useConfirmation } from '../../contexts/ConfirmContext';
import { baseUrl, fetchData, postData } from '../../hooks';
import ListFrame from '../UI/ListFrame';
import Spinner from '../UI/Spinner';
import Th, { Td } from '../UI/Th';
import { Content } from '../interfaces';
import Pagination from '../UI/Pagination';

const ListBooks = () => {
  const [url, setUrl] = useState('/api/books');
  const [books, setBooks] = useState<Content>({ loading: true, data: undefined });
  const [book, setBook] = useState<string | null>(null);
  const deleteMethode = 'delete';

  const { confirmed, setConfirmed } = useConfirmation();
  const { setShowModal } = useModal();

  useEffect(() => {
    fetchData(url, setBooks);
  }, [url]);

  useEffect(() => {
    if (book && confirmed) {
      postData(deleteMethode, book).then(() => fetchData(url, setBooks));
      setConfirmed?.(false);
    }
  }, [book, confirmed]);

  const { loading, data } = books;

  if (loading) {
    <Spinner />;
  }
  console.log(data);

  return (
    <ListFrame method={deleteMethode} data={data} newItem="Book">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <Th>Photo</Th>
            <Th>Title</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Published</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {data?.['hydra:member'].map((booK) => {
            return (
              'title' in booK && (
                <tr key={booK.id}>
                  <td className="px-4 py-4 whitespace-nowrap inline-block h-24 w-24 rounded-full ring-2 ring-white">
                    <img
                      className="h-full object-cover"
                      src={`${baseUrl}/images/books/${booK.photo}`}
                      alt={`${booK.title}`}
                    />
                  </td>
                  <Td>{booK.title}</Td>
                  <Td>{booK.price}</Td>
                  <Td>{booK.stock}</Td>
                  <Td>{booK.published ? 'yes' : 'no'}</Td>
                  <td className="grid grid-cols-2 items-center px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`${booK.slug}/${booK.id}`}>
                      <span className="text-green-500 hover:text-green-700"> Details</span>
                    </Link>

                    <button
                      onClick={() => {
                        setShowModal?.(true);
                        setBook(booK['@id']);
                      }}
                      className="text-red-500 hover:text-red-700 cursor:pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
      <Pagination data={data} setPageUrl={setUrl} />
    </ListFrame>
  );
};

export default ListBooks;
