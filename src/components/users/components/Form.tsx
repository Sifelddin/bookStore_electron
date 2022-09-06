import React, { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useModal } from '../../../contexts/ConfirmContext';
import { postData } from '../../../hooks';
import { Evalidation, FormInputs, User } from '../../interfaces';
import Modal from '../../modal';
import Button from '../../UI/Button';
import ErrorSpan from '../../UI/ErrorSpan';
import Label from '../../UI/Label';
import { getStatus, statusData } from '../helpers';

type Props = {
  user: User | undefined;
  setIsValid: React.Dispatch<SetStateAction<boolean>>;
};

const Form = ({ user, setIsValid }: Props) => {
  const [editStatus, setEditStatus] = useState(false);
  const { setShowModal } = useModal();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    if (user) {
      postData('put', `${user['@id']}/status`, undefined, statusData(data))
        .then(() => setIsValid(true))
        .catch((e) => {
          console.log(e);
          return e.response.data.violations
            ? e.response.data.violations.map((violation: Evalidation) => {
                return setError('Coef', { type: 'errors server', message: violation.message });
              })
            : setError('Coef', { type: 'errors server', message: 'an server error occurred ' });
        });
    }
  };
  const show = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.preventDefault();
    setShowModal?.(true);
  };
  return (
    <div className="flex flex-col w-full sm:max-w-md  px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center text-lg mb-2 md:mb-6 w-full">
          <Label fieldId="status">
            Status ({getStatus(user)}) :{' '}
            <button
              onClick={(e) => {
                e.preventDefault();
                setEditStatus(!editStatus);
              }}
              className="bg-blue-100 duration-200  rounded-lg m-1 hover:bg-blue-700 hover:text-white uppercase text-sm text-blue-900 px-2 py-1 font-semibold"
            >
              edit
            </button>
            {editStatus && (
              <select
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                {...register('private')}
                id="status"
              >
                <option hidden>select a user status</option>
                <option value="private">private</option>
                <option value="employee"> employee</option>
                <option value="professional"> professional</option>
              </select>
            )}
          </Label>
        </div>
        {user?.private === true || user?.private === false || (
          <div className="flex items-center text-lg mb-2 md:mb-6 w-full">
            <Label fieldId="roles">
              roles :
              <select
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                {...register('roles', { required: true })}
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
                {...register('Coef', { required: true })}
              />
              {errors.Coef?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
              {errors.Coef?.type === 'errors server' && <ErrorSpan>{errors.Coef.message}</ErrorSpan>}
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
