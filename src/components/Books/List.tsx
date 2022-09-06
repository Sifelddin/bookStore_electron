import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useModal, useConfirmation } from '../../contexts/ConfirmContext';
import { baseUrl, fetchData, postData } from '../../hooks';
import ListFrame from '../UI/ListFrame';
import Spinner from '../UI/Spinner';
import Th, { Td } from '../UI/Th';
import { ContentList } from '../interfaces';
import Pagination from '../UI/Pagination';
import Title from '../UI/Title';

const ListBooks = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('/api/books');
  const [books, setBooks] = useState<ContentList>({ loading: true, data: undefined });
  const [bookId, setBookId] = useState<number | null>(null);
  const deleteMethode = 'delete';

  const { confirmed, setConfirmed } = useConfirmation();
  const { setShowModal } = useModal();

  useEffect(() => {
    fetchData(url, setBooks).catch((e) =>
      e.response.data.code === 401 ? navigate('/', { replace: true }) : console.log(e)
    );
  }, [url]);

  useEffect(() => {
    if (bookId && confirmed) {
      setConfirmed?.(false);
      postData(deleteMethode, `/api/v2/books/${bookId}`)
        .then(() => fetchData(url, setBooks))
        .catch((e) => console.log(e));
    }
  }, [bookId, confirmed]);

  const { loading, data } = books;
  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Title>List of Books</Title>
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
                    <Td>{`${booK.price}€`}</Td>
                    <Td>{booK.stock}</Td>
                    <Td>{booK.published ? 'yes' : 'no'}</Td>
                    <td className="grid grid-cols-2 items-center px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`${booK.slug}/${booK.id}`}>
                        <span className="text-green-500 hover:text-green-700"> Details</span>
                      </Link>

                      {booK.bookOrders.length > 0 || (
                        <button
                          onClick={() => {
                            setShowModal?.(true);
                            setBookId(booK.id);
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

export default ListBooks;
