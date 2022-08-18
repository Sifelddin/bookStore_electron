import React, { useState, useEffect } from 'react';
import { fetchData } from '../../../hooks';
import Spinner from '../../UI/Spinner';
import Tr from '../components/UI/Tr';
import { OrderFetch } from '../../interfaces';

const OrderDetailts = ({ orderId }: { orderId: string }) => {
  const [orderDetailes, setOrderDetailes] = useState<OrderFetch>({
    loading: true,
    data: undefined
  });

  useEffect(() => {
    if (orderId) {
      fetchData(orderId, setOrderDetailes);
    }
  }, [orderId]);

  const { loading, data } = orderDetailes;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className=" w-4/5 bg-white mt-6 shadow-md">
      {data && (
        <div className="grid grid-cols-2 justify-between p-2 gap-2">
          <div className=" col-span-1">
            <table className="divide-y divide-gray-200">
              <tbody>
                <Tr th="Number :" td={data.id} />
                <Tr th="Date :" td={data.orderDate} />
                {data.payMethod && <Tr th="payment method :" td={data.payMethod} />}
                <Tr th="shipAddress :" td={data.shipAddress} />
                <Tr th="shipCity :" td={data.shipCity} />
                <Tr th="shipZipCode :" td={data.shipZipCode} />
                <Tr th="billAddress :" td={data.billAddress} />
                <Tr th="billCity :" td={data.billCity} />
                <Tr th="billZipCode :" td={data.billZipCode} />
              </tbody>
            </table>
          </div>
          <div className=" col-span-1">
            <table className="pb-2 w-full p-1 shadow-sm">
              <thead className="bg-orange-50">
                <tr>
                  <th className="uppercase text-xs font-medium">book title</th>
                  <th className="uppercase text-xs font-medium">qty</th>
                  <th className="uppercase text-xs font-medium">unit price</th>
                </tr>
              </thead>
              <tbody>
                {data?.bookOrders.map((book) => {
                  return (
                    <tr key={book['@id']}>
                      <td className="text-center text-sm">{book.book.title}</td>
                      <td className="text-center text-sm">{book.quantity}</td>
                      <td className="text-center text-sm">{book.unitPrice}€</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailts;
