import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Spinner from '../../UI/Spinner';
import { fetchData } from '../../../hooks';
import { ContentList } from '../../interfaces';
import { months as labels, years } from '../staticData';
import setData from '../helpers';

const BarChart = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const [orders, setOrders] = useState<ContentList>({ loading: true, data: undefined });
  const [orderDate, setOrderDate] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchData(`/api/v2/orders/all?page=1&orderDate=${orderDate}&exists%5BpaymentDate%5D=true`, setOrders);
  }, [orderDate]);
  const { loading, data: ordersData } = orders;

  const handleChange = (e: any) => {
    setOrderDate(e.target.value);
  };

  if (loading) {
    return <Spinner />;
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'CA',
        data: labels.map((label, index) => {
          return setData(ordersData, index);
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'turnover month by month'
      }
    }
  };

  return (
    <div className="w-8/12 mx-auto mt-4 ">
      <div className="flex items-center space-x-2">
        <label htmlFor="year" className=" text-md font-medium text-gray-700">
          Years :{' '}
        </label>
        <select
          className="focus:ring-indigo-500 focus:border-indigo-500 block  pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
          name="year"
          id="year"
          onChange={handleChange}
        >
          {years.map((year) => {
            return <option key={year}>{year}</option>;
          })}
        </select>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
