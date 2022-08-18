import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchData } from '../../hooks';
import Spinner from '../UI/Spinner';
import BookForm from './Form';
import { BookFetch, Book } from '../interfaces';

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState<BookFetch>({ loading: true, data: undefined });

  const { state } = useLocation();
  console.log(state);

  useEffect(() => {
    if (state) {
      const stateData = state as Book;
      setBook({ loading: false, data: stateData });
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
