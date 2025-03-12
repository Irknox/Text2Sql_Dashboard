import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import * as echarts from "echarts";

export default function Dashboard() {
  const [chartData, setChartData] = useState(null);

  const fetchChartData = async () => {
    const response = await fetch("http://localhost:8000/get-pie-chart/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dataset_id: 25 }),  
    });

    const data = await response.json();

    if (data.result) {
      // Formatear los datos para ECharts
      const formattedData = data.result[0].data.map(item => ({
        name: item.provincia,
        value: item.count
      }));
      
      setChartData(formattedData);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  useEffect(() => {
    if (chartData) {
      const chart = echarts.init(document.getElementById("pieChart"));
      const options = {
        title: { text: "Distribución de Provincias (Age > 20)", left: "center", style: { color: "#FFFFFF" } },
        tooltip: { trigger: "item" },
        legend: { orient: "vertical", left: "left" },
        series: [
          {
            name: "Personas",
            type: "pie",
            radius: "50%",
            data: chartData,
            emphasis: {
              itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: "rgba(0, 0, 0, 0.5)" },
            },
          },
        ],
      };
      chart.setOption(options);
    }
  }, [chartData]);

  return (
    <div>

      <div id="pieChart" style={{ width: "600px", height: "400px" }}></div>
    </div>
  );
}
