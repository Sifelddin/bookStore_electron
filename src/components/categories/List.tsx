import React, { useEffect, useState } from 'react';
import { fetchData } from '../../hooks';
import ListFrame from '../UI/ListFrame';
import Spinner from '../UI/Spinner';
import Th from '../UI/Th';
import { Content } from '../interfaces';

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
          return (
            <tr>
              <td>{cat.id}</td>
            </tr>
          );
        })}
      </tbody>
    </ListFrame>
  );
};

export default List;
