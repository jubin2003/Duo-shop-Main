import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BadgeAvatars from '../assets/BadgeAvatars';
// import { useDispatch } from 'react-redux';
// import { setLoggedOut } from '../redux/store';
import { Edit } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const ProfileContainer = styled.div`
  width: 100%;
  padding: 89px;
  background-color: #008080;
  color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Brutal_Regular', sans-serif; /* Use Brutal_Regular font */
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ProfileDetails = styled.div`
  width: 30%;
  border: 1px solid #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.1);
  background-color: #333;
`;

const UserDetails = styled.p`
  margin-bottom: 10px;
  color: #ddd;
  text-align: left;
  font-size: 16px;
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
`;

const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditIcon = styled(Edit)`
  margin-right: 5px;
`;

const GamerAvatar = styled.div`
  width: 80px;
  height: 80px;

  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const GamepadIcon = styled.span`
  font-size: 36px;
`;

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);

    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate();
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/fetchuser/find/${userId}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle error as needed
        }
      };
  
      if (userId) {
        fetchUserData();
      }
    }, [userId]);
  
    const handleLogout = () => {
     
      // Redirect to the login page
      navigate('/userhome'); // Uncomment this if you want to redirect after logout
    };
  
    const handleEditProfile = () => {
      Swal.fire({
        title: 'Edit Profile',
        html: `
          <input id="swal-input-name" class="swal2-input" placeholder="Name" value="${userData ? userData.username : ''}">
          <input id="swal-input-email" class="swal2-input" placeholder="Email" value="${userData ? userData.email : ''}">
          <input id="swal-input-address" class="swal2-input" placeholder="Address" value="${userData ? userData.address : ''}">
          <input id="swal-input-pincode" class="swal2-input" placeholder="Pincode" value="${userData ? userData.pincode : ''}">
        `,
        showCancelButton: true,
        confirmButtonText: 'Save',
        preConfirm: async () => {
          const username = document.getElementById('swal-input-name').value;
          const email = document.getElementById('swal-input-email').value;
          const address = document.getElementById('swal-input-address').value;
          const pincode = document.getElementById('swal-input-pincode').value;
  
          try {
            await axios.put(`http://localhost:5000/api/fetchuser/user/${userId}`, { username, email, address, pincode });
            const updatedUserData = { ...userData, username, email, address, pincode };
            setUserData(updatedUserData);
            Swal.fire('Profile Updated', '', 'success');
          } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire('Error', 'Failed to update profile', 'error');
          }
        }
      });
    };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <GamerAvatar>
          <BadgeAvatars/>
        </GamerAvatar>
        <h2>Welcome, {userData ? userData.username : 'Guest'}!</h2>
      </ProfileHeader>
      {userData && (
        <ProfileDetails>
          <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Your Profile Details:</h3>
          <UserDetails><strong>Name:</strong> {userData.username}</UserDetails>
          <UserDetails><strong>Email:</strong> {userData.email}</UserDetails>
          <UserDetails><strong>Address:</strong> {userData.address}</UserDetails>
          <UserDetails><strong>Pincode:</strong> {userData.pincode}</UserDetails>
          <EditButton onClick={handleEditProfile}>
            <EditIcon />
            Edit Profile
          </EditButton>
        </ProfileDetails>
      )}
      <LogoutButton onClick={handleLogout}>Go Home</LogoutButton>
    </ProfileContainer>
  );
};

export default ProfilePage;