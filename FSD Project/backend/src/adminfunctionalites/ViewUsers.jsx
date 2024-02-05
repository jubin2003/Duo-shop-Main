import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import ResponsiveAppBar from '../assets/ResponsiveAppBar';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Footer from '../assets/Footer';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';


const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  const handleDelete = useCallback(
    async (userId) => {
      try {
        await axios.delete(`http://localhost:5000/api/fetchuser/${userId}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        toast.success('User Deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Error in User Deletion. Please try again');

      }
    },
    []
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fetchuser/');
        const usersWithId = response.data.map((user) => ({ ...user, id: user._id }));
        setUsers(usersWithId);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'isAdmin', headerName: 'Admin', type: 'boolean', width: 90 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      type: 'date',
      width: 120,
      valueGetter: (params) => new Date(params.row.createdAt),
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      type: 'date',
      width: 120,
      valueGetter: (params) => new Date(params.row.updatedAt),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <ResponsiveAppBar />
      <ToastContainer/>
      <div style={{ height: 550, width: '100%' }}>
        <DataGrid rows={users} columns={columns} pageSize={5} checkboxSelection />
      </div>
      <Footer />
    </div>
  );
};

export default ViewUsers;
