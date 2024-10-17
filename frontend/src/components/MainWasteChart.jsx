import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MainWasteChart = ({ data }) => {
  console.log('Chart data:', data); // Debug to check data structure
  
  return (
    <div className='w-full h-auto'>
      <h2>Waste Report</h2>
      <div style={{ width: '50%', height: 400 }}> {/* Set a fixed height */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="wasteType" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="weight" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainWasteChart;
