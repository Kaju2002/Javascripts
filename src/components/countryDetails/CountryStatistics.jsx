import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext"; // Adjust path if needed
import { Pie } from "react-chartjs-2"; // Import Pie chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CountryStatistics = () => {
  const { code } = useParams();
  const { countries } = useContext(AppContext);
  const [chartData, setChartData] = useState({});
  
  const country = countries.find((c) => c.cca3 === code);

  useEffect(() => {
    if (country) {
      // Extract language data for the pie chart (use actual data here)
      const languageData = country.languages
        ? Object.values(country.languages).map((lang) => ({
            label: lang,
            value: Math.floor(Math.random() * 100), // Random value for demo purposes
          }))
        : [];

      setChartData({
        labels: languageData.map((data) => data.label),
        datasets: [
          {
            label: "Languages Spoken",
            data: languageData.map((data) => data.value),
            backgroundColor: ["#FF6F61", "#6B8E23", "#87CEFA", "#FFD700"], // Customize colors
            borderColor: "#fff",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [country]);

  // Check if the chartData or country data is not available yet
  if (!country || !chartData.labels) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">{country.name.common} Statistics</h1>
      
      {/* Pie Chart */}
      <div className="w-full md:w-1/2 mx-auto">
        <Pie data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default CountryStatistics;
