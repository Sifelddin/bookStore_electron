import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../../hooks';
import Spinner from '../../UI/Spinner';
import { UserFetch } from '../../interfaces';
import OrderDetailts from './OrderDetails';
import Th, { Td } from '../../UI/Th';
import Title from '../../UI/Title';

const Orders = () => {
  const [client, setClient] = useState<UserFetch>({ loading: true, data: undefined });
  const [orderId, setOrderId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    fetchData(`api/v2/users/${id}`, setClient).catch((e) =>
      e.response.data.code === 401 ? navigate('/', { replace: true }) : console.log(e)
    );
  }, []);

  const { loading, data } = client;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className=" flex flex-col justify-start items-center ">
      <Title> List of Orders </Title>
      <div className="mx-auto w-4/5 bg-white mt-6">
        <div className="grid grid-cols-2 py-3">
          <div className="col-span-1 flex justify-start space-x-3 px-2">
            <span className="text-black font-semibold">
              ID : <span className="text-gray-600 font-normal"> {data?.id}</span>
            </span>
            <span className="text-black font-semibold">
              FullName : <span className="text-gray-600 font-normal"> {`${data?.firstname} ${data?.lastname}`}</span>
            </span>
          </div>
          <div className="col-span-1 flex justify-end px-2 ">
            <span className="text-right text-black font-semibold">
              Orders Total : <span className="text-gray-600 font-normal"> {data?.orders.length}</span>
            </span>
          </div>
        </div>
        <table className="pb-2 w-full p-3 shadow-md">
          <thead className="bg-orange-50 shadow-sm">
            <tr>
              <Th>Order number</Th>
              <Th>Order Date</Th>
              <Th>Payement date</Th>
              <Th>Actions</Th>
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
                    <button onClick={() => setOrderId(order.id)}> Details</button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={4} className=" p-2 text-center  ">
                <Link
                  className="bg-gray-600 text-xs p-1 m-1 rounded-md text-white uppercase font-semibold hover:bg-gray-800 duration-200"
                  to="./../../"
                >
                  Back to List
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {orderId && <OrderDetailts orderId={orderId} isPrivate={data?.private} />}
    </div>
  );
};

export default Orders;
