import React from 'react';

const Tr = ({ td, th }: { td: string | number; th: string }) => {
  return (
    <tr>
      <th className="text-base text-left uppercase pr-3">{th}</th>
      <td className="text-base text-left">{td}</td>
    </tr>
  );
};

export default Tr;
