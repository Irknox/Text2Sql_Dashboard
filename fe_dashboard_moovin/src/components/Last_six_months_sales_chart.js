import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as echarts from "echarts";
import { fetchChartData } from "../redux/slices/last_six_months_slice";

const Last_six_months_sales_chart = () => {
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
      const chart = echarts.init(document.getElementById("pieChart"));

      const options = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          data: chartData.legend_data,
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Número de Ventas",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            label: {
              position: "inner",
              fontSize: 14,
            },
            labelLine: {
              show: false,
            },
            data: chartData.sales_amount.map((item) => ({
              value: item.value,
              name: item.value,
              selected: item.selected || false,
            })),
          },
          {
            name: "Total de Ventas en colones",
            type: "pie",
            radius: ["45%", "60%"],
            labelLine: {
              length: 30,
            },
            label: {
              formatter: "{b}：{c} ({d}%)",
            },
            data: chartData.amount_data,
          },
        ],
      };

      chart.setOption(options);
    }
  }, [chartData]);

  return (
    <div className="first_dashboard_container">
      <h1>Dashboard de Ventas (Últimos 6 Meses)</h1>
      <div id="pieChart" style={{ width: "600px", height: "400px" }}></div>
      {chartStatus === "loading" && <p>Cargando datos...</p>}
      {chartStatus === "failed" && <p>Error al cargar los datos.</p>}
    </div>
  );
};

export default Last_six_months_sales_chart;

