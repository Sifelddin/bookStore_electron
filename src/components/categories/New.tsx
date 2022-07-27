import React from 'react';
import CategoryForm from './Form';

const NewCategory = () => {
  return <CategoryForm method="post" action="create" />;
};

export default NewCategory;
