import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
    url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
      center;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
  margin-bottom: 10px;
`;

const LinkText = styled.a`
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedIsAdmin = localStorage.getItem('isAdmin');

    if (token) {
      setIsLoggedIn(true);

      if (storedIsAdmin) {
        setIsAdmin(storedIsAdmin === 'true');
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
      toast.error('Username is required');

    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      toast.error('Password is required ');

    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          document.cookie = `accessToken=${data.accessToken}; Secure; HttpOnly; SameSite=Strict`;
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('username', formData.username);
          localStorage.setItem('isAdmin', data.isAdmin);

          setIsLoggedIn(true);

          // Correct the comparison based on the received boolean value
          if (data.isAdmin) {
            toast.success('Login successfully');
            navigate('/admindashboard');
          } else {
            toast.success('Login successfully');
            navigate('/userhome');
          }
        } else {
          console.error('Login failed!');
          toast.error('Login Failed Try Again');

        }
      } catch (error) {
        console.error('Error during login:', error);
        toast.error('Error occured during login ');

      }
    }
  };

  const handleLogout = () => {
    document.cookie = 'accessToken=; Secure; HttpOnly; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/login');
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
   <ToastContainer/>
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <Error>{errors.username}</Error>}

          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <Error>{errors.password}</Error>}

          <Button type="button" onClick={handleLogin}>
            LOGIN
          </Button>
          <LinkText>Forgot Password</LinkText>
          <LinkText href="/register">Create a new Account</LinkText>
        </Form>
      </Wrapper>
    </Container>
    </>
  );
};

export default Login;
