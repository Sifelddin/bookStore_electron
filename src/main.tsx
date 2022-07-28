import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
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

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="admin" element={<App />}>
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="suppliers/new" element={<NewSupplier />} />
          <Route path="suppliers/:id" element={<EditSupplier />} />
          <Route path="categories" element={<ListCategories />} />
          <Route path="categories/:id" element={<EditCategories />} />
          <Route path="categories/new" element={<NewCategory />} />
          <Route path="books/new" element={<NewBook />} />
          <Route path="books/:slug/:id" element={<ShowBook />} />
          <Route path="books/:slug/:id/edit" element={<EditBook />} />
          <Route path="books" element={<ListBooks />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
