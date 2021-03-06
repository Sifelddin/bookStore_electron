import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../hooks';
import Spinner from '../UI/Spinner';
import SupplierForm from './Form';

const EditSupplier = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState({ loading: true, data: undefined });

  useEffect(() => {
    fetchData(`/api/suppliers/${id}`, setSupplier);
  }, []);

  const { loading, data } = supplier;

  if (loading) {
    return <Spinner />;
  }
  return <SupplierForm supplier={data} method="put" />;
};

export default EditSupplier;
