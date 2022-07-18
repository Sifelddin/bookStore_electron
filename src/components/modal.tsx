import React from 'react';
import { useConfirmation, useModal } from '../contexts/ConfirmContext';

interface Props {
  method: string;
}

const Modal = ({ method }: Props) => {
  const { setConfirmed } = useConfirmation();
  const { showModal, setShowModal } = useModal();

  let modalBg =
    'min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-20 outline-none focus:outline-none bg-no-repeat bg-center bg-cover ';
  let modalClasses =
    'w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white z-50 transition-all ease-in-out duration-300';
  if (showModal) {
    modalBg += ' z-20';
    modalClasses += ' translate-y-5 opacity-1 ';
  } else {
    modalBg += ' -z-20 ';
    modalClasses += ' translate-y-0 opacity-0';
  }

  return (
    <div className={modalBg}>
      <div className="absolute bg-black opacity-80 inset-0 z-0 tra" />
      <div className={modalClasses}>
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
            <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
            <p className="text-sm text-gray-500 px-8">
              Do you really want to delete this supplier? This process cannot be undone
            </p>
          </div>

          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button
              onClick={(e) => {
                e.preventDefault();
                setConfirmed?.(false);
                setShowModal?.(false);
              }}
              className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => {
                setConfirmed?.(true);
                setShowModal?.(false);
              }}
              className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
            >
              {method}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
