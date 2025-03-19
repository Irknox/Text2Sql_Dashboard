import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as echarts from "echarts";
import { fetchChartData } from "../redux/slices/last_six_months_slice";

const LastSixMonthsSalesChart = () => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.sales_chart_data.data);
  const chartStatus = useSelector((state) => state.sales_chart_data.status);

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
        },
        xAxis: {
          type: "category",
          data: chartData.legend_data,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Número de Ventas",
            type: "bar",
            data: chartData.sales_amount.map((item) => item.value),
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
        legend: {
          data: ["Total de Ventas en colones"],
          top: "5%",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: chartData.legend_data,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Total de Ventas en colones",
            type: "bar",
            data: chartData.amount_data.map((item) => item.value),
          },
        ],
      };
      amountChart.setOption(amountOptions);
    }
  }, [chartData]);

  return (
    <div className="first_dashboard_container">
      <div id="salesChart" style={{ width: "600px", height: "400px", marginBottom: "20px" }}></div>
      <div id="amountChart" style={{ width: "600px", height: "400px" }}></div>
      {chartStatus === "loading" && <p>Cargando datos...</p>}
      {chartStatus === "failed" && <p>Error al cargar los datos.</p>}
    </div>
  );
};

export default LastSixMonthsSalesChart;




/*import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as echarts from "echarts";
import { fetchChartData } from "../redux/slices/last_six_months_slice";

const LastSixMonthsSalesChart = () => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.sales_chart_data.data);
  const chartStatus = useSelector((state) => state.sales_chart_data.status);

  useEffect(() => {
    if (chartStatus === "idle") {
      dispatch(fetchChartData());
    }
  }, [dispatch, chartStatus]);

  useEffect(() => {
    if (chartData) {
      const chart = echarts.init(document.getElementById("barChart"));
      
      const options = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Número de Ventas", "Total de Ventas en colones"],
          top: "5%",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: chartData.legend_data,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Número de Ventas",
            type: "bar",
            data: chartData.sales_amount.map((item) => item.value),
          },
          {
            name: "Total de Ventas en colones",
            type: "bar",
            data: chartData.amount_data.map((item) => item.value),
          },
        ],
      };
      
      chart.setOption(options);
    }
  }, [chartData]);

  return (
    <div className="first_dashboard_container">
      <h1>Dashboard de Ventas (Últimos 6 Meses)</h1>
      <div id="barChart" style={{ width: "600px", height: "400px" }}></div>
      {chartStatus === "loading" && <p>Cargando datos...</p>}
      {chartStatus === "failed" && <p>Error al cargar los datos.</p>}
    </div>
  );
};

export default LastSixMonthsSalesChart; */
