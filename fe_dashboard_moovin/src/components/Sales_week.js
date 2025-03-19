import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as echarts from "echarts";
import { fetchSalesWeekData } from "../redux/slices/sales_week_slice";

const Sales_week = () => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.sales_chart_data.data);
  const chartStatus = useSelector((state) => state.sales_chart_data.status);

  useEffect(() => {
    if (chartStatus === "idle") {
      dispatch(fetchSalesWeekData());
    }
  }, [dispatch, chartStatus]);

  console.log("Datos pages:", chartData);

  useEffect(() => {
    if (chartData) {
      const salesChart = echarts.init(document.getElementById("salesWeekChart"));

      const days = Object.keys(chartData);
      const salesValues = Object.values(chartData);

      const salesOptions = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["Ventas Semanales"],
          top: "5%",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: [1,3],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Ventas Semanales",
            type: "bar",
            data: [1,3],
          },
        ],
      };

      salesChart.setOption(salesOptions);
    }
  }, [chartData]);

  return (
    <div className="sales_chart_container">
      <h1>Ventas Semanales</h1>
      <div id="salesWeekChart" style={{ width: "600px", height: "400px" }}></div>
      {chartStatus === "loading" && <p>Cargando datos...</p>}
      {chartStatus === "failed" && <p>Error al cargar los datos.</p>}
    </div>
  );
};

export default Sales_week;
