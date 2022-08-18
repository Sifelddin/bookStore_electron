import React from 'react';

const ModalMess = ({ action }: { action: string }) => {
  let message = '';

  switch (action) {
    case 'delete':
      message = 'delete process cannot be undone ';
      break;
    case 'put':
    case 'update':
      message += 'do you confirm your modification ?';
      break;
    case 'post':
    case 'create':
      message += 'do you confirm your registration ?';
      break;
    default:
      message = '';
  }
  return <p className="text-sm text-gray-500 px-8">{message}</p>;
};

export default ModalMess;
