import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Suppliers from './components/suppliers/List';
import App from './pages/App';
import Home from './pages/home';
import NewSupplier from './components/suppliers/New';
import EditSupplier from './components/suppliers/Edit';
import ListCategories from './components/categories/List';
import EditCategories from './components/categories/Edit';
import NewCategory from './components/categories/New';
import NewBook from './components/Books/New';
import ShowBook from './components/Books/Show';
import EditBook from './components/Books/Edit';
import ListBooks from './components/Books/List';
import Employees from './components/users/employees/Employees';
import ShowUser from './components/users/components/ShowUser';
import Orders from './components/users/clients/orders';
import Privates from './components/users/clients/privates';
import Profs from './components/users/clients/Profs';
import Wrapper from './components/dashboard/Wrapper';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="admin" element={<App />}>
          <Route path="dashboard" element={<Wrapper />} />
          <Route path="suppliers">
            <Route index element={<Suppliers />} />
            <Route path="new" element={<NewSupplier />} />
            <Route path=":id" element={<EditSupplier />} />
          </Route>
          <Route path="categories">
            <Route index element={<ListCategories />} />
            <Route path=":id" element={<EditCategories />} />
            <Route path="new" element={<NewCategory />} />
          </Route>
          <Route path="books">
            <Route index element={<ListBooks />} />
            <Route path="new" element={<NewBook />} />
            <Route path=":slug/:id" element={<ShowBook />} />
            <Route path=":slug/:id/edit" element={<EditBook />} />
          </Route>
          <Route path="users">
            <Route path="privates">
              <Route index element={<Privates />} />
              <Route path=":id/orders" element={<Orders />} />
              <Route path=":id/edit" element={<ShowUser />} />
            </Route>
            <Route path="professionals">
              <Route index element={<Profs />} />
              <Route path=":id/orders" element={<Orders />} />
              <Route path=":id/edit" element={<ShowUser />} />
            </Route>
            <Route path="employees">
              <Route index element={<Employees />} />
              <Route path=":id/edit" element={<ShowUser />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
