import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { fetchData } from '../hooks';

interface providerProps {
  confirmed?: boolean;
  setConfirmed?: React.Dispatch<React.SetStateAction<boolean>>;
  showModal?: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const confirmContext = createContext<providerProps>({});
const showModalContext = createContext<providerProps>({});

export const useModal = () => useContext(showModalContext);
export const useConfirmation = () => useContext(confirmContext);

const ConfirmContext = ({ children }: { children: React.ReactNode }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const confirmation = useMemo(() => {
    return { confirmed, setConfirmed };
  }, [confirmed]);

  const modal = useMemo(() => {
    return { showModal, setShowModal };
  }, [showModal]);

  return (
    <showModalContext.Provider value={modal}>
      <confirmContext.Provider value={confirmation}>{children}</confirmContext.Provider>
    </showModalContext.Provider>
  );
};

export default ConfirmContext;
