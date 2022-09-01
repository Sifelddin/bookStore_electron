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
const authContext = createContext({});

export const useModal = () => useContext(showModalContext);
export const useConfirmation = () => useContext(confirmContext);
export const useAuth = () => useContext(authContext);

const ConfirmContext = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState({ loading: true, data: undefined });
  const [confirmed, setConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   fetchData('/api/me', setAuthUser)
  //     .then((res) => console.log(res))
  //     .catch((e) => console.log(e));
  // }, []);
  // console.log(authUser);

  const confirmation = useMemo(() => {
    return { confirmed, setConfirmed };
  }, [confirmed]);

  const modal = useMemo(() => {
    return { showModal, setShowModal };
  }, [showModal]);

  const user = useMemo(() => {
    return authUser;
  }, [authUser]);

  return (
    <showModalContext.Provider value={modal}>
      <confirmContext.Provider value={confirmation}>
        <authContext.Provider value={user}> {children}</authContext.Provider>
      </confirmContext.Provider>
    </showModalContext.Provider>
  );
};

export default ConfirmContext;
