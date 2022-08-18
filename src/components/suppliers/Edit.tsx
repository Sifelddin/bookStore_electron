import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchData } from '../../hooks';
import { SupplierFetch, Supplier } from '../interfaces';
import Spinner from '../UI/Spinner';
import SupplierForm from './Form';

const EditSupplier = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState<SupplierFetch>({ loading: true, data: undefined });

  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      const stateData = state as Supplier;
      setSupplier({ loading: false, data: stateData });
    } else {
      fetchData(`/api/suppliers/${id}`, setSupplier);
    }
  }, [state]);
  const { loading, data } = supplier;

  if (loading) {
    return <Spinner />;
  }
  return <SupplierForm supplier={data} method="put" action="update" />;
};

export default EditSupplier;
