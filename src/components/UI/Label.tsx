import React from 'react';

interface LabelProps {
  feildId: string;
  children: React.ReactNode;
}

const Label = ({ feildId, children }: LabelProps) => {
  return (
    <label htmlFor={feildId} className="block text-md font-medium text-gray-700 w-full">
      {children}
    </label>
  );
};

export default Label;
