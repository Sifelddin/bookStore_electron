import React from 'react';
import BookForm from './Form';

const NewBook = () => {
  return <BookForm method="post" action="create" />;
};

export default NewBook;
