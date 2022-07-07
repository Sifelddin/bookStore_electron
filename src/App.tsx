import React from 'react';
import { Outlet } from 'react-router-dom';
import Aside from './components/Aside';
import Main from './components/Main';

const App = () => {
  return (
    <div className="bg-blue-50 h-full w-screen flex flex-row">
      <Aside />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

export default App;
