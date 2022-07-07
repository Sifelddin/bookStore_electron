import React from 'react';
import { useParams } from 'react-router-dom';

const Supplier = () => {
  const { id } = useParams();
  console.log(id);

  return <div>Supplier </div>;
};

export default Supplier;
