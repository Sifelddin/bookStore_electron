import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../hooks';
import Spinner from '../UI/Spinner';
import CategoryForm from './Form';
import { CategoryFetch } from '../interfaces';

const EditCategories = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<CategoryFetch>({ loading: true, data: undefined });

  useEffect(() => {
    fetchData(`/api/v2/categories/${id}`, setCategory);
  }, []);

  const { loading, data } = category;

  if (loading) {
    return <Spinner />;
  }
  return <CategoryForm category={data} action="update" />;
};

export default EditCategories;
