import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    landmark: '',
    phoneNumber: '',
    address: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Validate other fields like name, landmark, phoneNumber, address, pincode as needed

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      toast.error('Username is required');
    }

    // Validate email
    if (!formData.email.trim()) {
      toast.error('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Invalid email format');
    }

    // Validate password
    if (!formData.password.trim()) {
      toast.error('Password is required');
    }

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      toast.error('Name is required');
    }

    // Validate landmark
    if (!formData.landmark.trim()) {
      newErrors.landmark = 'Landmark is required';
      toast.error('Landmark is required');
    }

    // Validate phoneNumber
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
      toast.error('Phone Number is required');
    }

    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      toast.error('Address is required');
    }

    // Validate pincode
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
      toast.error('Pincode is required');
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success('Registration successful!');
          navigate('/login');
          console.log('Registration successful!');
        } else {
          console.error('Registration failed!');
          toast.error('Registration failed!');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        toast.error('Error during registration');
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <Wrapper>
          <Title>SIGN UP</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <span>{errors.username}</span>}

            <Input
              type="text"
              placeholder="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span>{errors.email}</span>}

            <Input
              placeholder="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span>{errors.password}</span>}

            <Input
              type="text"
              placeholder="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span>{errors.name}</span>}

            <Input
              type="text"
              placeholder="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              required
            />
            {errors.landmark && <span>{errors.landmark}</span>}

            <Input
              type="text"
              placeholder="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <span>{errors.phoneNumber}</span>}

            <Input
              type="text"
              placeholder="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <span>{errors.address}</span>}

            <Input
              type="text"
              placeholder="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
            {errors.pincode && <span>{errors.pincode}</span>}

            <Agreement>
              By creating an account, I consent to the processing of my personal data in accordance with the{' '}
              <b>PRIVACY POLICY</b>
            </Agreement>

            <Button type="submit">Register</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
