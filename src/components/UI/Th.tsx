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

export const Tr = ({ td, th }: { td: string | number; th: string }) => {
  return (
    <tr>
      <th className="text-xs text-left uppercase">{th}</th>
      <td className="text-sm text-left">{td}</td>
    </tr>
  );
};

export default Th;
