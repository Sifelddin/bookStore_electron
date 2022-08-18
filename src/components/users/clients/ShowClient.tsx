import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../../hooks';
import Spinner from '../../UI/Spinner';
import { UserFetch } from '../../interfaces';
import OrderDetailts from './OrderDetails';
import Th, { Td } from '../../UI/Th';

const ShowClient = () => {
  const [client, setClient] = useState<UserFetch>({ loading: true, data: undefined });
  const [orderId, setOrderId] = useState<string | null>('');

  const { id } = useParams();
  useEffect(() => {
    fetchData(`api/users/${id}`, setClient);
  }, []);

  const { loading, data } = client;
  console.log(data);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="h-screen flex flex-col justify-start items-center ">
      <div className="mx-auto w-4/5 bg-white mt-6">
        <table className="pb-2 w-full p-3 shadow-md">
          <thead className="bg-orange-50 shadow-sm">
            <tr>
              <Th>order number</Th>
              <Th>Order Date</Th>
              <Th>Payement date</Th>
              <Th>actions</Th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data?.orders?.map((order) => {
              return (
                <tr key={order.id} className="w-full">
                  <Td>{order.id}</Td>
                  <Td>{order.orderDate}</Td>
                  <td className={order.paymentDate ? 'text-green-500 p-1' : 'text-red-500 p-1'}>
                    {order.paymentDate ? order.paymentDate : 'Not Paid'}
                  </td>
                  <td className="text-blue-500 cursor-pointer p-1">
                    <button onClick={() => setOrderId(order['@id'])}> Details</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {orderId && <OrderDetailts orderId={orderId} />}
    </div>
  );
};

export default ShowClient;
