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
        },
        xAxis: [
          {
            type: "category",
            data: chartData.xAxis.data,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Ventas ultimos 2 años",
            axisLabel: {
              formatter: "{value}",
            },
          },

        ],
        series: chartData.series.map((serie) => ({
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
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        width: "90%",
        justifySelf: "center",
        justifyContent:"center",
        height: "80%",
      }}
    >
      <h1 style={{ fontFamily: "system-ui", color: "#302e2e", justifySelf:"center" }}>
        Ventas Semanales
      </h1>
      <div id="salesWeekChart" style={{ width: "100%", height: "90%" }}></div>
      {chartStatus === "loading" && <p>Cargando datos...</p>}
      {chartStatus === "failed" && <p>Error al cargar los datos.</p>}
    </div>
  );
};

export default Sales_week;
