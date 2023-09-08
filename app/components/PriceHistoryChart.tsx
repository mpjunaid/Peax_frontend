import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const PriceHistoryChart = ({ data }) => {
  const [selectedName, setSelectedName] = useState("");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Extract unique item names from the data
    const uniqueNames = Array.from(new Set(data.map((item) => item.name)));
    // Initialize the chart with the first name in the dropdown
    if (uniqueNames.length > 0) {
      setSelectedName(uniqueNames[0]);
    }
  }, [data]);

  useEffect(() => {
    if (selectedName) {
      // Filter data by selected name
      const filteredData = data.filter((item) => item.name === selectedName);

      // Extract dates and prices
      const dates = filteredData.map((item) =>
        new Date(item.updated_at).toLocaleDateString()
      );
      const prices = filteredData.map((item) => parseFloat(item.price));
      // Update chart data
      setChartData({
        labels: dates,
        datasets: [
          {
            label: `${selectedName} Price Over Time`,
            data: prices,
            borderColor: "blue",
            borderWidth: 2,
            fill: false,
          },
        ],
      });
    }
  }, [selectedName, data]);

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  return (
    <>
      <div>
        <label htmlFor="selectName" className="font-semibold ">
          Select a product name for vizualisation
        </label>
        <select
          className="select select-info w-full max-w-xs m-2"
          id="selectName"
          onChange={handleNameChange}
          value={selectedName}
        >
          {data &&
            data.length > 0 &&
            Array.from(new Set(data.map((item) => item.name))).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
        </select>
      </div>
      <div className="chart-container">
        {chartData && <Line style={{ height: "180px" }} data={chartData} />}
      </div>
    </>
  );
};

export default PriceHistoryChart;
