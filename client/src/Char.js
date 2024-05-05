import React from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Important for Chart.js v3 or later

const data = {
  labels: ['1', '2', '3', '4'],
  datasets: [
    {
      label: 'Ratings',
      data: [12,52,34,4],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1
    }
  ]
};

function Char() {
  return(
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
        <div style={{width:500,backgroundColor:'#060445'}}>
            <Bar data={data} />
        </div>
    </div>
  );
}

export default Char;
