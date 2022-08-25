import React, { useState, useEffect } from 'react';
import { fetchData } from '../../../hooks';
import Spinner from '../../UI/Spinner';
import Tr from '../components/UI/Tr';
import { OrderFetch } from '../../interfaces';
import OrderForm from './OrderForm';
import { finalTotal, total, totalTVA } from '../helpers';

const OrderDetailts = ({ orderId, isPrivate }: { orderId: string; isPrivate: boolean | undefined }) => {
  const [orderDetailes, setOrderDetailes] = useState<OrderFetch>({
    loading: true,
    data: undefined
  });
  const [editDiscount, setEditDiscount] = useState(false);
  const [editPayDate, setEditPayDate] = useState(false);
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    setOrderDetailes({ loading: false, data: undefined });
    if (orderId) {
      fetchData(orderId, setOrderDetailes);
    }
  }, [orderId, submited]);

  const { loading, data } = orderDetailes;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className=" w-4/5 bg-white my-4 shadow-md">
      {data && (
        <div className="grid grid-cols-2 justify-between p-2 gap-2">
          <div className=" col-span-1">
            <table className="divide-y divide-gray-200 ">
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
                <tr>
                  <th className="text-sm text-left uppercase">Discount :</th>
                  <td className="text-sm text-left">
                    {data.discount ? `${data.discount} €` : 0}
                    {data.paymentDate ? (
                      ''
                    ) : (
                      <button
                        onClick={() => setEditDiscount(!editDiscount)}
                        className="bg-slate-200 p-1 rounded-md capitalize text-xs text-gray-700 font-bold hover:text-black hover:bg-slate-200 duration-200 "
                      >
                        {editDiscount ? 'hide' : 'edit'}
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="text-sm text-left uppercase">Payment Date :</th>
                  <td className="text-sm text-left">
                    {data.paymentDate || (
                      <button
                        onClick={() => setEditPayDate(!editPayDate)}
                        className="bg-slate-200 p-1 rounded-md capitalize text-xs text-gray-700 font-bold hover:text-black hover:bg-slate-200 duration-200 "
                      >
                        {editPayDate ? 'hide' : 'edit'}
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            {isPrivate === false && !data.paymentDate && (
              <OrderForm order={data} editPayDate={editPayDate} editDiscount={editDiscount} setSubmited={setSubmited} />
            )}
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
            <div className="p-2">
              <table className="w-full">
                <tbody>
                  <tr className="flex justify-between w-full my-1  border-b-2 ">
                    <th className="text-sm">Books :</th>
                    <td>{total(data)}€</td>
                  </tr>
                  <tr className="flex justify-between w-full my-1">
                    <th className="text-sm">TVA 10%:</th>
                    <td>+ {totalTVA(data, 10 / 100).toFixed(2)}€</td>
                  </tr>
                  <tr className="flex justify-between border-b-2 my-1">
                    <th className="text-sm">Discount :</th>
                    <td>{data.discount ? `- ${data.discount}€` : 0}</td>
                  </tr>
                  <tr className="flex justify-between my-1">
                    <th className="text-sm"> Total :</th>
                    <td>{finalTotal(data, 10 / 100).toFixed(2)}€</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailts;
