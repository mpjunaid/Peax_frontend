import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";

Chart.register(Tooltip, Title, ArcElement, Legend);

const PieChart = ({ plants }) => {
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    const prepareDataForPieChart = () => {
      const categoryStockCounts = {};
      let totalStockCount = 0;

      plants.forEach((plant) => {
        const { category, stock } = plant;
        if (!categoryStockCounts[category]) {
          categoryStockCounts[category] = 0;
        }
        categoryStockCounts[category] += stock;
        totalStockCount += stock;
      });

      const categories = Object.keys(categoryStockCounts);
      const stockCounts = Object.values(categoryStockCounts);
      const percentages = categories.map((category) => {
        const stockCount = categoryStockCounts[category];
        return ((stockCount / totalStockCount) * 100).toFixed(0);
      });

      return { labels: categories, datasets: percentages };
    };

    if (plants.length > 0) {
      const { labels, datasets } = prepareDataForPieChart();

      setPieChartData({
        labels: labels,
        datasets: [
          {
            data: datasets,
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
            ],
          },
        ],
      });
    }
  }, [plants]);

  return (
    <>
    <div className="chart-container" >
      {pieChartData && <Pie data={pieChartData}></Pie>}
    </div>
    </>
  );
};

export default PieChart;