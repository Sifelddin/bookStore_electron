import React, { useEffect, useState } from 'react';
import { fetchData } from '../../hooks';
import { OrderFetch } from '../interfaces';
import Spinner from '../UI/Spinner';
//import BarChart from './components/BarChart';

const Wrapper = () => {
  const [orders, setOrders] = useState<OrderFetch>({ loading: true, data: undefined });

  useEffect(() => {
    fetchData('/api/orders', setOrders);
  }, []);
  const { loading, data } = orders;
  console.log(data);

  if (loading) {
    return <Spinner />;
  }

  return <div>sdfs</div>;
};

export default Wrapper;
