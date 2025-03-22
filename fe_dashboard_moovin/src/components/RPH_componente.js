import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import obtenerVentasPorHora from "../services/sims_horas_services";

const RPH_componente = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ventas = await obtenerVentasPorHora();
        setData(ventas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const chartDom = document.getElementById("chart");
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: "Ventas de Recargas por Hora",
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: data.map((item) => item.hora),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data.map((item) => item.Ventas),
            type: "bar",
            color: "#007bff",
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [data]);

  return (
    <div
      id="chart"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        justifySelf: "left",
        alignSelf: "center",
      }}
    />
  );
};

export default RPH_componente;
