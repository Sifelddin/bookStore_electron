import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchData } from '../../hooks';
import Spinner from '../UI/Spinner';
import BookForm from './Form';
import { Content } from './types';

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Content>({ loading: true, data: undefined });

  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      const stateData = state as Content;
      setBook(stateData);
    } else {
      fetchData(`/api/books/${id}`, setBook);
    }
  }, [state]);
  const { loading, data } = book;
  if (loading) {
    return <Spinner />;
  }
  return <BookForm action="update" book={data} />;
};

export default EditBook;
