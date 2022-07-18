import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../../hooks';
import { IFormInputs, ISupplier } from './interfaces';
import Modal from '../modal';
import Button from '../UI/Button';
import Label from '../UI/Label';
import ErrorSpan from '../UI/ErrorSpan';
import LinkSpan from '../UI/LinkSpan';
import { useConfirmation, useModal } from '../../contexts/ConfirmContext';

interface Evalidation {
  code: string;
  message: string;
  propertyPath: string;
}

interface Props {
  supplier?: ISupplier;
  method: string;
}

const SupplierForm = ({ supplier, method }: Props) => {
  const [postStatus, setPostStatus] = useState<AxiosResponse | undefined>(undefined);
  const navigate = useNavigate();
  const { confirmed, setConfirmed } = useConfirmation();
  const { setShowModal } = useModal();

  const [errApiMessages, setErrApiMessages] = useState<Evalidation[] | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>();
  console.log(confirmed);

  const onSubmit = (data: IFormInputs) => {
    if (confirmed) {
      postData(method, supplier ? supplier['@id'] : `/api/suppliers`, data, setPostStatus).then(() => {
        navigate('/admin/suppliers', { replace: true });
        setConfirmed?.(false);
      });
    }
  };

  useEffect(() => {
    if (typeof postStatus !== 'undefined' && postStatus.status === 422) {
      setErrApiMessages(postStatus.data.violations);
    }
  }, [postStatus]);

  console.log(errApiMessages);

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      <div className="flex flex-col w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="p-2 md:p-6">
          <div className="flex items-center text-lg mb-6 md:mb-8 w-full">
            <Label feildId="contactName">
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
            </Label>
          </div>
          <div className="w-full grid grid-cols-2 gap-3 ">
            <Button handler={setShowModal}>{method === 'post' ? 'Create' : 'Update'}</Button>
            <Link to="/admin/suppliers" replace>
              <LinkSpan link="/admin/suppliers">List</LinkSpan>
            </Link>
          </div>
          <Modal method={method} />
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;
