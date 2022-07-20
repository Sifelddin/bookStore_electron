import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Suppliers from './components/suppliers/List';
import App from './pages/App';
import Home from './pages/home';
import NewSupplier from './components/suppliers/New';
import EditSupplier from './components/suppliers/Edit';
import List from './components/categories/List';
import Edit from './components/categories/Edit';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="admin" element={<App />}>
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="suppliers/new" element={<NewSupplier />} />
          <Route path="suppliers/:id" element={<EditSupplier />} />
          <Route path="categories" element={<List />} />
          <Route path="categories/edit" element={<Edit />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
