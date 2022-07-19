import React from 'react';
import { useConfirmation, useModal } from '../contexts/ConfirmContext';
import Button from './UI/Button';
import ModalMess from './UI/ModalMess';

interface Props {
  method: string;
}

const Modal = ({ method }: Props) => {
  const { setConfirmed } = useConfirmation();
  const { showModal, setShowModal } = useModal();

  const cancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowModal?.(false);
    e.preventDefault();
  };

  let confirmation;
  if (method === 'delete') {
    confirmation = () => {
      setConfirmed?.(true);
      setShowModal?.(false);
    };
  } else {
    confirmation = () => {
      setShowModal?.(false);
    };
  }

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

            <ModalMess method={method} />
          </div>

          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <Button handler={cancel}>Cancel</Button>
            <Button handler={confirmation}>confirm</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
