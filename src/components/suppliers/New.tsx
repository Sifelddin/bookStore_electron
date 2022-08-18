import React from 'react';
import SupplierForm from './Form';

const NewSupplier = () => {
  return <SupplierForm method="post" action="create" />;
};

export default NewSupplier;
