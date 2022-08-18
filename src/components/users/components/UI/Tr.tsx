import React from 'react';

const Tr = ({ th, td }: { th: string; td: string | number }) => {
  return (
    <tr>
      <th className="text-xs text-left uppercase">{th}</th>
      <td className="text-sm text-left">{td}</td>
    </tr>
  );
};

export default Tr;
