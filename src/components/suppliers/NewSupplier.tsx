import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface IFormInputs {
  contactName: string;
}

const NewSupplier = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>();

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      <div className="flex flex-col w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="p-2 md:p-6">
          <div className="flex items-center text-lg mb-6 md:mb-8 w-full">
            <label htmlFor="contactName" className="block text-md font-medium text-gray-700 w-full">
              Contact Name
              <input
                type="text"
                id="contactName"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                {...register('contactName', {
                  required: true
                })}
              />
              {errors.contactName?.type === 'required' && (
                <span className="text-red-600 text-sm">this feild is required</span>
              )}
            </label>
          </div>
          <div className="w-full grid grid-cols-2 gap-3 ">
            <button className="uppercase inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-white shadow-md duration-75 hover:bg-green-400 w-full">
              Register
            </button>
            <Link
              className="uppercase text-center inline-block rounded-md bg-gray-700 px-6 py-2 font-semibold text-white shadow-md duration-75 hover:bg-gray-500 w-full"
              to="../suppliers"
            >
              {' '}
              List
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSupplier;
