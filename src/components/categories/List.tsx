import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../../hooks';
import ListFrame from '../UI/ListFrame';
import Spinner from '../UI/Spinner';
import Th, { Td } from '../UI/Th';
import { Category, Content } from '../interfaces';
import LinkSpan from '../UI/LinkSpan';

const List = () => {
  const [categories, setCategories] = useState<Content>({ loading: true, data: undefined });
  const deleteMethode = 'delete';
  useEffect(() => {
    fetchData('/api/categories', setCategories);
  }, []);

  const { loading, data } = categories;

  if (loading) {
    return <Spinner />;
  }

  return (
    <ListFrame method={deleteMethode} data={data} newItem="Category">
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
          console.log(cat);

          return (
            'name' in cat && (
              <tr key={cat.id}>
                <Td>{cat.id}</Td>
                <td className="px-4 py-4 whitespace-nowrap inline-block h-24 w-24 rounded-full ring-2 ring-white">
                  <img
                    className="h-full object-cover"
                    src={`https://localhost:8000/uploads/images/${cat.photo}`}
                    alt=""
                  />
                </td>
                <Td>{cat.name}</Td>
                <Td>{(cat.catParent as Category | null)?.name}</Td>
                <td className="grid grid-cols-2 items-center px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`${cat.id}`} state={cat}>
                    <LinkSpan link={`${cat.id}`}>edit</LinkSpan>
                  </Link>

                  <button className="text-red-500 hover:text-red-700 cursor:pointer">Delete</button>
                </td>
              </tr>
            )
          );
        })}
      </tbody>
    </ListFrame>
  );
};

export default List;
