import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../../hooks';
import Modal from '../modal';
import Button from '../UI/Button';
import Label from '../UI/Label';
import ErrorSpan from '../UI/ErrorSpan';
import LinkSpan from '../UI/LinkSpan';
import { useModal } from '../../contexts/ConfirmContext';
import { Evalidation, FormInputs, FormComponentProps } from '../interfaces';

interface SpecificFormComponentProps extends Omit<FormComponentProps, 'method'> {
  method: string;
}

const SupplierForm = ({ supplier, method, action }: SpecificFormComponentProps) => {
  const navigate = useNavigate();
  const { setShowModal } = useModal();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    try {
      await postData(method, supplier ? supplier['@id'] : `/api/v2/suppliers`, undefined, data);
      navigate('/admin/suppliers', { replace: true });
    } catch (e: any) {
      console.log(e);
      return e.response.data.violations
        ? e.response.data.violations.map((violation: Evalidation) => {
            return setError('contactName', { type: 'errors server', message: violation.message });
          })
        : setError('contactName', { type: 'errors server', message: 'an server error occurred ' });
    }
    return data;
  };

  const show = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.preventDefault();
    setShowModal?.(true);
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      <div className="flex flex-col w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="p-2 md:p-6">
          <div className="flex items-center text-lg mb-6 md:mb-8 w-full">
            <Label fieldId="contactName">
              Contact Name
              <input
                type="text"
                id="contactName"
                defaultValue={supplier?.contactName}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                {...register('contactName', {
                  required: true
                })}
              />
              {errors.contactName?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
              {errors.contactName?.type === 'errors server' && <ErrorSpan>{errors.contactName.message}</ErrorSpan>}
            </Label>
          </div>
          <div className="w-full grid grid-cols-2 gap-3 ">
            <Button handler={show}>{action}</Button>
            <Link to="/admin/suppliers" replace>
              <LinkSpan link="/admin/suppliers">List</LinkSpan>
            </Link>
          </div>
          <Modal action={method} />
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;
