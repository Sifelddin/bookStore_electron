import React from 'react';
import { useForm } from 'react-hook-form';
import { useModal } from '../../../contexts/ConfirmContext';
import { postData } from '../../../hooks';
import { FormInputs, Order } from '../../interfaces';
import Modal from '../../modal';
import Button from '../../UI/Button';
import Label from '../../UI/Label';

const OrderForm = ({ isPrivate, order }: { isPrivate: boolean | undefined; order: Order | undefined }) => {
  const { handleSubmit, register, errors } = useForm<FormInputs>();
  const { setShowModal } = useModal();
  const today = new Date().toLocaleDateString().split('/').reverse().join('/').replace(/[/]/g, '-');
  console.log(order?.paymentDate);

  const paymentDate = order?.paymentDate?.split('-').reverse().join('-');

  function onSubmit(data: FormInputs) {
    console.log(data);

    postData('put', order ? order['@id'] : '', undefined, data).then((res) => console.log(res));
  }

  const show = (e: MouseEvent) => {
    e.preventDefault();
    setShowModal?.(true);
  };

  return (
    <div className="my-2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex  space-x-2">
          <Label fieldId="paymentDate">
            Payment Date :
            <input
              id="paymentDate"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-5 text-xs sm:text-sm border-gray-300 rounded-md"
              type="date"
              defaultValue={order?.paymentDate ? paymentDate : today}
              {...register('paymentDate')}
            />
          </Label>
          <Label fieldId="discount">
            Discount :
            <input
              id="discount"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-5 text-xs sm:text-sm border-gray-300 rounded-md"
              type="text"
              defaultValue={order?.discount}
              {...register('discount')}
            />
          </Label>
        </div>
        <div className="flex justify-center">
          <Button handler={show}>Edit Order</Button>
        </div>
        <Modal action="update" />
      </form>
    </div>
  );
};

export default OrderForm;
