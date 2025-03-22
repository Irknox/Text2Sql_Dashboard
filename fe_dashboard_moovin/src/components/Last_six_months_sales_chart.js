import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as echarts from "echarts";
import { fetchChartData } from "../redux/slices/last_six_months_slice";

const LastSixMonthsSalesChart = () => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.sales_six_months.data);
  const chartStatus = useSelector((state) => state.sales_six_months.status);

  useEffect(() => {
    if (chartStatus === "idle") {
      dispatch(fetchChartData());
    }
  }, [dispatch, chartStatus]);

  useEffect(() => {
    if (chartData) {
      const salesChart = echarts.init(document.getElementById("salesChart"));
      const salesOptions = {
        backgroundColor: "#ffffff",
        tooltip: { trigger: "axis" },
        legend: {
          data: ["Número de Ventas"],
          top: "5%",
          left: "center",
          textStyle: { color: "#008b8b" },
        },
        xAxis: {
          type: "category",
          data: chartData.legend_data,
          axisLabel: { color: "#008b8b" },
        },
        yAxis: {
          type: "value",
          axisLabel: { color: "#008b8b" },
        },
        series: [
          {
            name: "Número de Ventas",
            type: "bar",
            data: chartData.sales_amount.map((item) => item.value.toLocaleString("de-DE")),
            itemStyle: { color: "#40e0d0" },
          },
        ],
      };
      salesChart.setOption(salesOptions);

      const amountChart = echarts.init(document.getElementById("amountChart"));
      const amountOptions = {
        backgroundColor: "#ffffff",
        tooltip: { trigger: "axis" },
        legend: {
          data: ["Total de Ventas en colones"],
          top: "5%",
          left: "center",
          textStyle: { color: "#008b8b" },
        },
        xAxis: {
          type: "category",
          data: chartData.legend_data,
          axisLabel: { color: "#008b8b" },
        },
        yAxis: {
          type: "value",
          axisLabel: { color: "#008b8b" },
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "15%",
          containLabel: true,
        },
        series: [
          {
            name: "Total de Ventas en colones",
            type: "bar",
            data: chartData.amount_data.map((item) => item.value.toLocaleString("de-DE")),
            itemStyle: { color: "#20b2aa" },
          },
        ],
      };
      amountChart.setOption(amountOptions);
    }
  }, [chartData]);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        margin: "20px auto",
        maxWidth: "800px",
      }}
    >
      <h1
        style={{
          color: "#008b8b",
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
        }}
      >
        Reporte de Ventas - Últimos 6 Meses
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div id="salesChart" style={{ flex: 1, height: "400px"}}></div>
        <div id="amountChart" style={{ flex: 1, height: "400px" }}></div>
      </div>
      {chartStatus === "loading" && <p>Cargando datos...</p>}
      {chartStatus === "failed" && <p>Error al cargar los datos.</p>}
    </div>
  );
};

export default LastSixMonthsSalesChart;
