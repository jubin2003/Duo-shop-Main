import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import axios from 'axios';

const ChartView = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fetchuser/stats'); // Assuming your backend API is at /stats
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const sparkLineChartData = userData.map((item) => item.total);

  return (
    <Stack direction="row" sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <SparkLineChart data={sparkLineChartData} height={100} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <SparkLineChart plotType="bar" data={sparkLineChartData} height={100} />
      </Box>
    </Stack>
  );
};

export default ChartView;
