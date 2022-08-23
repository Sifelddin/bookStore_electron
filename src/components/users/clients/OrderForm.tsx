import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useModal } from '../../../contexts/ConfirmContext';
import { postData } from '../../../hooks';
import { FormInputs, Order } from '../../interfaces';
import Modal from '../../modal';
import Button from '../../UI/Button';
import ErrorSpan from '../../UI/ErrorSpan';
import Label from '../../UI/Label';

type Props = {
  order: Order | undefined;
  editPayDate: boolean;
  editDiscount: boolean;
  setSubmited: Dispatch<SetStateAction<boolean>>;
};

const OrderForm = ({ order, editPayDate, editDiscount, setSubmited }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormInputs>();
  const { setShowModal } = useModal();
  const today = new Date().toISOString().slice(0, 10);
  setSubmited(false);
  function onSubmit(data: FormInputs) {
    const formDate = data;
    if (!editPayDate && data.paymentDate) {
      delete formDate.paymentDate;
    }
    postData('put', order ? order['@id'] : '', undefined, formDate).then(() => {
      setSubmited(true);
    });
  }

  const show = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.preventDefault();
    setShowModal?.(true);
  };

  return (
    <div className="my-2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex  space-x-2">
          {editPayDate && (
            <Label fieldId="paymentDate">
              Payment Date :
              <input
                id="paymentDate"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-5 text-xs sm:text-sm border-gray-300 rounded-md"
                type="date"
                defaultValue={today}
                {...register('paymentDate')}
              />
            </Label>
          )}
          {editDiscount && (
            <Label fieldId="discount">
              Discount :
              <input
                id="discount"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-5 text-xs sm:text-sm border-gray-300 rounded-md"
                type="text"
                defaultValue={order?.discount}
                {...register('discount', { pattern: /(\d+)(.\d+)?/ })}
              />
              {errors.discount?.type === 'pattern' && <ErrorSpan> accept numbers or decimal number </ErrorSpan>}
            </Label>
          )}
        </div>
        {(editPayDate || editDiscount) && (
          <div className="flex justify-center">
            <Button handler={show}>Edit Order</Button>
          </div>
        )}
        <Modal action="update" />
      </form>
    </div>
  );
};

export default OrderForm;
