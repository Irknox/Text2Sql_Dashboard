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

  useEffect(() => {
    if (chartData && chartData.series) {
      const salesChart = echarts.init(
        document.getElementById("salesWeekChart")
      );

      const salesOptions = {
        title: {
          text: "Ventas Semanales",
          subtext: "Comparación de Ventas de los Últimos 2 Años",
          left: "center",
          textStyle: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "'Arial', sans-serif",
          },
          subtextStyle: {
            fontSize: 14,
            fontStyle: "italic",
            fontFamily: "'Arial', sans-serif",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        
        legend: {
          data: chartData.legend.data,
          textStyle: {
            fontSize: 14,
            fontFamily: "'Arial', sans-serif",
          },
        },
        xAxis: [
          {
            type: "category",
            data: chartData.xAxis.data,
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              fontSize: 12,
              fontFamily: "'Arial', sans-serif",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Ventas Últimos 2 Años (₡)",
            nameTextStyle: {
              fontSize: 14,
              fontFamily: "'Arial', sans-serif",
            },
            axisLabel: {
              formatter: "{value}",
              fontSize: 12,
              fontFamily: "'Arial', sans-serif",
            },
          },
        ],
        series: chartData.series.map((serie,index) => ({
          name: serie.name,
          type: "bar",
          data: serie.data.map((value) => value.toLocaleString("de-DE")),
          tooltip: {
            valueFormatter: function (value) {
              return "₡" + value;
            },
          },
        })),
      };

      salesChart.setOption(salesOptions);
    }
  }, [chartData]);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(39, 38, 38, 0.46)",
        width: "90%",
        border: "1px solid rgba(56, 54, 54, 0.57)",
        justifySelf: "center",
        justifyContent: "center",
        height: "80%",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontFamily: "Arial, sans-serif",
          color: "#302e2e",
          textAlign: "center",
          fontSize: "24px",
        }}
      >
        Ventas Semanales
      </h1>
      <div id="salesWeekChart" style={{ width: "100%", height: "80%" }}></div>
      {chartStatus === "loading" && (
        <p style={{ textAlign: "center", fontSize: "16px" }}>Cargando datos...</p>
      )}
      {chartStatus === "failed" && (
        <p style={{ textAlign: "center", fontSize: "16px" }}>
          Error al cargar los datos.
        </p>
      )}
    </div>
  );
};

export default Sales_week;
