import React from 'react';

import { Data } from '../interfaces';

interface Props {
  data?: Data;
  setPageUrl: (value: string) => void;
}

const Pagination = ({ data, setPageUrl }: Props) => {
  const btnClasses =
    'flex justify-center items-center px-2 py-1 mt-2 cursor-pointer border border-transparent rounded-md font-medium text-sm text-gray-600 tracking-widest hover:underline active:text-gray-800  disabled:opacity-25 transition ease-in-out duration-150 ';
  if (!data) {
    return <div />;
  }
  return (
    <div>
      {data['hydra:totalItems'] > data['hydra:member'].length && (
        <div className="w-full flex justify-around border-t-2 ">
          <button onClick={() => setPageUrl(data['hydra:view']['hydra:first'])} className={btnClasses}>
            Lirst P
          </button>
          {data['hydra:view']['hydra:previous'] && (
            <button onClick={() => setPageUrl(data['hydra:view']['hydra:previous'])} className={btnClasses}>
              {'<<'}prev
            </button>
          )}
          {data['hydra:view']['hydra:next'] && (
            <button onClick={() => setPageUrl(data['hydra:view']['hydra:next'])} className={btnClasses}>
              next {'>>'}
            </button>
          )}
          <button onClick={() => setPageUrl(data['hydra:view']['hydra:last'])} className={btnClasses}>
            Last P
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
