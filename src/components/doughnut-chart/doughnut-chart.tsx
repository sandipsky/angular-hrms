import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale);

const DoughnutChart = () => {
  const data = {
    labels: ['Rent', 'Food', 'Transportation', 'Entertainment', 'Others'], // Example categories
    datasets: [
      {
        data: [30, 20, 15, 25, 10], // Example data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66C2A5', '#B3B3B3'],
      },
    ],
  };

  return <Doughnut data={data} />;
};

export { DoughnutChart };
