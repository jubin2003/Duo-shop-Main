import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from '../assets/ResponsiveAppBar'; // Adjust the import path
import TemporaryDrawer from '../assets/TemporaryDrawer';
import MediaCard from '../assets/MediaCard';
import Footer from '../assets/Footer';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    navigate('/');
  };
  useEffect(() => {
    const handleBrowserBack = (event) => {
      event.preventDefault();
      navigate('/login');
    };

    window.addEventListener('popstate', handleBrowserBack);

    return () => {
      window.removeEventListener('popstate', handleBrowserBack);
    };
  }, [navigate]);

  return (
    <>
      <ResponsiveAppBar />
      <br />
       
      {/* <TemporaryDrawer/> */}
      <div className="admin-dashboard">
        <main role="main" className="col-md-12 ml-sm-auto col-lg-12 px-4">
          <div className="col-md-12">
            <h1 className="mt-5">Welcome to the Admin Dashboard</h1>
          </div>
          <br />
          <br />
          {/* <ChartView/> */}
          <MediaCard/>
          <br /><br />
          <Footer/>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
