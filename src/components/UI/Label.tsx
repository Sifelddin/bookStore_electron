import React from 'react';

interface LabelProps {
  fieldId: string;
  children: React.ReactNode;
}

const Label = ({ fieldId, children }: LabelProps) => {
  return (
    <label htmlFor={fieldId} className="block text-md font-medium text-gray-700 w-full">
      {children}
    </label>
  );
};

export default Label;
