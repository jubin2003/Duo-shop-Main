import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ResponsiveAppBar from '../assets/ResponsiveAppBar';
const Container = styled.div`
  max-width: 100%;
  margin: 0px auto;
  padding: 20px;
  margin-left: 15%;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #007bff;
  font-size: 32px;
  margin-bottom: 30px;
`;

const OrderList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const OrderItem = styled.li`
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transition: transform 0.3s ease-in-out;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const OrderTitle = styled.h2`
  font-size: 24px;
  color: #343a40;
`;

const OrderStatus = styled.span`
  font-size: 18px;
  color: ${(props) => {
    switch (props.status) {
      case 'Processing':
        return '#ffc107';
      case 'Shipped':
        return '#28a745';
      case 'Delivered':
        return '#007bff';
      case 'Canceled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  }};
  text-transform: capitalize;
  font-weight: bold;
`;
const OrdersTitle = styled.h2`
  font-size: 24px;
  color: #343a40;
`;
const OrderDetail = styled.p`
  margin: 10px 0;
  font-size: 16px;
`;

const StatusDropdown = styled.select`
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 8px;
  background-color: #fff;
  color: #495057;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: 0;
  }
`;

const CustomButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  float: right;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #0056b3;
  }
`;

const ConfirmationBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  opacity: ${(props) => (props.visible ? '1' : '0')};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &:hover {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  }
`;

const ConfirmationBoxContent = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ConfirmationButton = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? '#007bff' : '#6c757d')};
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#495057')};
  }
`;
const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;
const OrderAddress = styled.h2`
font-size: 24px;
color: #343a40;
`;

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [orderIdToUpdate, setOrderIdToUpdate] = useState('');
    const [newStatusToUpdate, setNewStatusToUpdate] = useState('');
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orderdata/');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    const handleStatusChange = async (orderId, newStatus) => {
      setOrderIdToUpdate(orderId);
      setNewStatusToUpdate(newStatus);
      setConfirmationVisible(true);
    };
  
    const confirmStatusChange = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orderdata/${orderIdToUpdate}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatusToUpdate }),
        });
        if (!response.ok) {
          throw new Error('Failed to update order status');
        }
        // Update the local orders state with the updated status
        setOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order._id === orderIdToUpdate) {
              return { ...order, status: newStatusToUpdate };
            }
            return order;
          })
        );
        setConfirmationVisible(false);
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    };
  
    const cancelStatusChange = () => {
      setConfirmationVisible(false);
    };

  return (
    <div>
        <ResponsiveAppBar/>
    <Container>
   
      <Title>Manage Orders</Title>
      
      <OrderList>
        {orders.map((order) => (
          <OrderItem key={order._id}>
            <OrderHeader>
              <OrderTitle>Order ID: {order._id}</OrderTitle>
              <OrderStatus status={order.status}>{order.status}</OrderStatus>
            </OrderHeader>
           <OrdersTitle>Product Details:</OrdersTitle>
              <ul>
                {order.productId.map((product) => (
                  <li key={product._id}>
                    <p>Product Name: {product.title}</p>
                    <ProductImage src={product.img} alt={product.title} />
                    {/* <p>Price: {product.price}</p> */}
                  </li>
                ))}
              </ul>
              <OrderAddress>Order Placed Address:</OrderAddress>
<OrderDetail>Customer Name: {order.customerDetails && order.customerDetails.name}</OrderDetail>
<OrderDetail>Email: {order.customerDetails && order.customerDetails.email}</OrderDetail>
<OrderDetail>Phone Number: {order.customerDetails && order.customerDetails.contact}</OrderDetail>
<OrderDetail>Shipping Address: {order.customerDetails && order.customerDetails.address}</OrderDetail>

            {/* Add dropdown for updating order status */}
            <StatusDropdown
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </StatusDropdown>
            <CustomButton onClick={() => handleStatusChange(order._id, 'Delivered')}>
              Mark as Delivered
            </CustomButton>
          </OrderItem>
        ))}
      </OrderList>
      <ConfirmationBox visible={confirmationVisible}>
        <ConfirmationBoxContent>
          <p>
            Are you sure you want to update the status to {newStatusToUpdate}?
          </p>
          <ConfirmationButton primary onClick={confirmStatusChange}>
            Yes
          </ConfirmationButton>
          <ConfirmationButton onClick={cancelStatusChange}>No</ConfirmationButton>
        </ConfirmationBoxContent>
      </ConfirmationBox>
    </Container>
    </div>
  );
};

export default ViewOrders;
