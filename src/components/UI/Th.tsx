import React from 'react';

const Th = ({ children }: { children: string }) => {
  return (
    <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );
};

export const Td = ({ children }: { children?: string | number }) => {
  return <td className="px-2 py-2">{children}</td>;
};

export default Th;
