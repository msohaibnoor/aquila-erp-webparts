import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = () => {
  const data = {
    datasets: [
      {
        label: "# of Votes",
        data: [15, 10, 75],
        backgroundColor: ["#F2C94C", "#1FCFB3", "#24B5DF"],
        borderColor: ["#F2C94C", "#1FCFB3", "#24B5DF"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Pie data={data} />
    </>
  );
};

export default PieChart;
