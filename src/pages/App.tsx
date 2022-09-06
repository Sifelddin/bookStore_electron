import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ConfirmContext from '../contexts/ConfirmContext';
import Aside from '../layouts/Aside';
import Main from '../layouts/Main';

const App = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (token === null) {
    navigate('/', { replace: true });
  }
  return (
    <div className="bg-blue-50 min-h-screen w-screen flex flex-row relative ">
      <Aside />
      <ConfirmContext>
        <Main>
          <Outlet />
        </Main>
      </ConfirmContext>
    </div>
  );
};

export default App;
