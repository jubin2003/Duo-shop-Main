import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import Success from './pages/Success';
import UserHome from './pages/UserHome';
import AdminDashboard from './admin/AdminDashboard';
import AddProduct from '../src/adminfunctionalites/AddProduct';
import ViewProduct from '../src/adminfunctionalites/ViewProduct';
import ViewUsers from '../src/adminfunctionalites/ViewUsers';
import UpdateProduct from '../src/adminfunctionalites/UpdateProduct';

const App = () => {
  const user = true ; // Replace this with your actual authentication logic
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userhome" element={<UserHome/>} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/add-product" element={<AddProduct/>} />
        <Route path="/view-product" element={<ViewProduct/>} />
        <Route path="/view-users" element={<ViewUsers/>} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/products/:category" element={<ProductList />} />
        {/* Update the comment in the next line */}
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        {/* <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} /> */}
        {/* <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


      </Routes>
    </Router>
  );
};

export default App;