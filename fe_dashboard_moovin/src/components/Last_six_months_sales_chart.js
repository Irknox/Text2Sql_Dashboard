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
      // Gráfico de ventas
      const salesChart = echarts.init(document.getElementById("salesChart"));
      const salesOptions = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Número de Ventas"],
          top: "5%",
          left: "center",
          textStyle: { color: "#004d40" },
        },
        xAxis: {
          type: "category",
          data: chartData.legend_data,
          axisLabel: { color: "#004d40" },
        },
        yAxis: {
          type: "value",
          axisLabel: { color: "#004d40" },
        },
        series: [
          {
            name: "Número de Ventas",
            type: "bar",
            data: chartData.sales_amount.map((item) => item.value),
            itemStyle: { color: "#26a69a" },
          },
        ],
      };
      salesChart.setOption(salesOptions);

      // Gráfico de montos en colones
      const amountChart = echarts.init(document.getElementById("amountChart"));
      const amountOptions = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: chartData.legend_data,
          axisLabel: { color: "#004d40" },
        },
        yAxis: {
          type: "value",
          axisLabel: { color: "#004d40" },
        },
        series: [
          {
            name: "Total de Ventas en colones",
            type: "bar",
            data: chartData.amount_data.map((item) => item.value),
            itemStyle: { color: "#26a69a" },
          },
        ],
      };
      amountChart.setOption(amountOptions);
    }
  }, [chartData]);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        width: "80%",
        justifySelf: "center",
        height:"100%"
      }}
    >
      <h1
        style={{
          color: "#004d40",
          textAlign: "center",
          marginBottom: "20px",
          fontFamily: "system-ui",
          color: "#302e2e",
        }}
      >
        Reporte de Ventas - Últimos 6 Meses
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", width:"100%",height:"90%"}}>
        <div id="salesChart" style={{ width: "100%", height: "100%",display:"flex",justifySelf:"center" }}></div>
        <div id="amountChart" style={{ width: "100%", height: "100%" }}></div>
      </div>
      {chartStatus === "loading" && <p>Cargando datos...</p>}
      {chartStatus === "failed" && <p>Error al cargar los datos.</p>}
    </div>
  );
};

export default LastSixMonthsSalesChart;
