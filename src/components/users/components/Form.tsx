import React from 'react';
import { useForm } from 'react-hook-form';
import { useModal } from '../../../contexts/ConfirmContext';
import { FormInputs, User } from '../../interfaces';
import Modal from '../../modal';
import Button from '../../UI/Button';
import Label from '../../UI/Label';

const Form = ({ user }: { user: User | undefined }) => {
  const { setShowModal } = useModal();
  const { register, errors, handleSubmit } = useForm<FormInputs>();

  const onSubmit = (data) => {
    console.log(data);
  };
  const show = (e: MouseEvent) => {
    e.preventDefault();
    setShowModal?.(true);
  };
  return (
    <div className="flex flex-col w-full sm:max-w-md  px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center text-lg mb-2 md:mb-6 w-full">
          <Label fieldId="status">
            Status :
            <select
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
              {...register('private')}
              id="status"
            >
              <option hidden>select a user status</option>
              <option value="private">private</option>
              <option value="pemployee"> employee</option>
              <option value="professional"> professional</option>
            </select>
          </Label>
        </div>
        {user?.private === true || user?.private === false || (
          <div className="flex items-center text-lg mb-2 md:mb-6 w-full">
            <Label fieldId="roles">
              roles :
              <select
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                {...register('roles')}
                id="roles"
              >
                <option value="ROLE_USER">Client</option>
                <option value="ROLE_COMMERCIAL"> Commercial</option>
                <option value="ROLE_CATALOGUE"> Catalogue</option>
                <option value="ROLE_ADMIN"> Admin</option>
              </select>
            </Label>
          </div>
        )}
        {(user?.private === true || user?.private === false) && (
          <div className="flex items-center text-lg mb-2 md:mb-6 w-full">
            <Label fieldId="coef">
              Coef :
              <input
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                type="text"
                defaultValue={user.Coef}
                id="coef"
                {...register('Coef')}
              />
            </Label>
          </div>
        )}
        <div className="flex justify-center">
          <Button handler={show}>update</Button>
        </div>
        <Modal action="update" />
      </form>
    </div>
  );
};

export default Form;
