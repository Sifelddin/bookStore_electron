import React from 'react';

const ModalMess = ({ method }: { method: string }) => {
  let message = '';

  switch (method) {
    case 'delete':
      message = 'Do you really want to delete this supplier? This process cannot be undone';
      break;
    case 'put':
      message += 'do you confirm your modification ?';
      break;
    case 'post':
      message += 'do you confirm your registration ?';
      break;
    default:
      message = '';
  }
  return <p className="text-sm text-gray-500 px-8">{message}</p>;
};

export default ModalMess;
