import React from 'react';
import { useForm } from 'react-hook-form';

const NewSupplier = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: object) => {
    return data;
  };
  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      <div className="flex flex-col w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="p-2 md:p-6">
          <div className="flex items-center text-lg mb-6 md:mb-8 w-full">
            <label htmlFor="contactName" className="block text-md font-medium text-gray-700 w-full">
              ContactName
              <input
                type="text"
                id="contactName"
                className=" block w-full pl-4 pr-7 sm:text-base border-green-300 rounded-md p-2 my-2"
                {...register('contactName', {
                  required: true
                })}
              />
            </label>
          </div>
          <button className="inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400 w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewSupplier;
