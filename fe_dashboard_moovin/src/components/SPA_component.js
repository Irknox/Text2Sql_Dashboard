import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { fetchVentasSims } from "../services/SPA_services";

const SPA_component = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVentasSims()
      .then((response) => {
        console.log("Datos obtenidos:", response);
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartOptions = {
    title: {
      text: "SIMs Vendidas y Activadas por Provincia",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["SIM Vendidas", "SIM Activadas"],
      top: "10%",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.provincia),
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "SIM Vendidas",
        type: "bar",
        data: data.map((item) => item.vendidas),
        barWidth: "30%",
      },
      {
        name: "SIM Activadas",
        type: "bar",
        data: data.map((item) => item.activadas),
        barWidth: "30%",
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        justifySelf: "right",
        alignSelf: "center",
      }}
    >
      <ReactECharts option={chartOptions} />
    </div>
  );
};

export default SPA_component;
