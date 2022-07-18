import React from 'react';
import { Outlet } from 'react-router-dom';
import ConfirmContext from '../contexts/ConfirmContext';
import Aside from '../layouts/Aside';
import Main from '../layouts/Main';

const App = () => {
  return (
    <div className="bg-blue-50 h-full w-screen flex flex-row">
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
