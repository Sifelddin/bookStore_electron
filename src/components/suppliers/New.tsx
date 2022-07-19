import React from 'react';
import SupplierForm from './Form';

const NewSupplier = () => {
  console.log('render new supplier');

  return <SupplierForm method="post" />;
};

export default NewSupplier;
