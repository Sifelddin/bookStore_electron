import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../hooks';
import Spinner from '../UI/Spinner';
import CategoryForm from './Form';

const EditCategories = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({ loading: true, data: undefined });

  useEffect(() => {
    fetchData(`/api/categories/${id}`, setCategory);
  }, []);

  const { loading, data } = category;

  if (loading) {
    return <Spinner />;
  }
  return <CategoryForm category={data} method="put" />;
};

export default EditCategories;
