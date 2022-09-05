import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData, postData, baseUrl } from '../../hooks';
import ListFrame from '../UI/ListFrame';
import Spinner from '../UI/Spinner';
import Th, { Td } from '../UI/Th';
import { Category, ContentList } from '../interfaces';
import LinkSpan from '../UI/LinkSpan';
import Pagination from '../UI/Pagination';
import { useConfirmation, useModal } from '../../contexts/ConfirmContext';
import Title from '../UI/Title';

const ListCategories = () => {
  const [url, setUrl] = useState('/api/v2/categories');
  const [categories, setCategories] = useState<ContentList>({ loading: true, data: undefined });
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const deleteMethode = 'delete';

  const { confirmed, setConfirmed } = useConfirmation();
  const { setShowModal } = useModal();

  useEffect(() => {
    fetchData(url, setCategories);
  }, [url]);

  useEffect(() => {
    if (categoryId && confirmed) {
      postData(deleteMethode, `/api/v2/categories/${categoryId}`).then(() => fetchData(url, setCategories));
      setConfirmed?.(false);
    }
  }, [categoryId, confirmed]);

  const { loading, data } = categories;

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Title>List of Categories</Title>
      <ListFrame method={deleteMethode} data={data} newItem="Category">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th>Id</Th>
              <Th>Photo</Th>
              <Th>Category</Th>
              <Th>Category Parent</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {data?.['hydra:member'].map((cat) => {
              return (
                'name' in cat && (
                  <tr key={cat.id}>
                    <Td>{cat.id}</Td>
                    <td className="px-4 py-4 whitespace-nowrap inline-block h-24 w-24 rounded-full ring-2 ring-white">
                      <img
                        className="h-full object-cover"
                        src={`${baseUrl}/images/categories/${cat.photo}`}
                        alt={`${cat.name}`}
                      />
                    </td>
                    <Td>{cat.name}</Td>
                    <Td>{(cat.catParent as Category | null)?.name}</Td>
                    <td className="grid grid-cols-2 items-center px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`${cat.id}`}>
                        <LinkSpan link={`${cat.id}`}>edit</LinkSpan>
                      </Link>

                      {cat.books.length > 0 || (
                        <button
                          onClick={() => {
                            setShowModal?.(true);
                            setCategoryId(cat.id);
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

export default ListCategories;
