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
          subtext: "Análisis de ventas de recargas durante el día, segmentado por hora",
          left: "center",
          textStyle: {
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            fontSize: 18,
            color: "#333",
          },
          subtextStyle: {
            fontFamily: "Roboto, sans-serif",
            fontSize: 14,
            color: "#666",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          textStyle: {
            fontFamily: "Arial, sans-serif",
            fontSize: 12,
          },
=======
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.hora),
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: (value) => value.toLocaleString("de-DE"),
          },
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
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.45)",
        border: "1px solid rgba(58, 57, 57, 0.4)",
        justifySelf: "left",
        alignSelf: "center",
      }}
    />
  );
};

export default RPH_componente;
