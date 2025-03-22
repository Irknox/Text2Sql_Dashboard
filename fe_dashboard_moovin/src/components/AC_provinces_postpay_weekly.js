import * as echarts from "echarts";
import { useEffect, useState } from "react";
import AC_Services from "@/services/AC_services";

const AC_provinces_postpay_weekly = () => {
  const [AC_provinces_data, setAC_provinces_data] = useState([]);

  useEffect(() => {
    AC_Services.get_province_postpay_active_weekly()
      .then((response) => {
        setAC_provinces_data(response.postpago_activos_semanal_provincia);
      })
      .catch((error) => {
        console.log("Error obteniendo datos de prepagos por provincia:", error);
      });
  }, []);

  useEffect(() => {
    var chartDom = document.getElementById("AC_provinces_postpay_weekly_chart");
    var myChart = echarts.init(chartDom);
    var option;

    const semanas = Array.from({ length: 17 }, (_, i) => `Semana ${i + 1}`);

    option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
        formatter: function (params) {
          let tooltip = '';
          params.forEach((param) => {
            tooltip += `${param.seriesName}: ${param.value.toLocaleString("de-DE")} usuarios<br/>`;
          });
          return tooltip;
        }
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
        data: [
          "San José",
          "Alajuela",
          "Cartago",
          "Puntarenas",
          "Heredia",
          "Limon",
          "Guanacaste",
        ],
      },
      xAxis: [
        {
          type: "category",
          data: semanas,
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "Usuarios",
          min: 0,
          max: 4000000, 
          interval: 500000,
          axisLabel: {
            formatter: "{value}",
          },
        },
      ],
      series: [
        {
          name: "San José",
          type: "line",
          itemStyle: {
            color: "#2c71f3 ", 
          },
          tooltip: {
            valueFormatter: function (value) {
              return value.toLocaleString("de-DE") + " usuarios";
            },
          },
          data: AC_provinces_data.map(item => item.San_Jose),
        },
        {
          name: "Alajuela",
          type: "line",
          itemStyle: {
            color: "#f54c58", 
          },
          tooltip: {
            valueFormatter: function (value) {
              return value.toLocaleString("de-DE") + " usuarios";
            },
          },
          data: AC_provinces_data.map(item => item.Alajuela),
        },
        {
          name: "Cartago",
          type: "bar",
          itemStyle: {
            color: "#06d4c4", 
          },
          tooltip: {
            valueFormatter: function (value) {
              return value.toLocaleString("de-DE") + " usuarios";
            },
          },
          data: AC_provinces_data.map(item => item.Cartago),
        },
        {
          name: "Puntarenas",
          type: "bar",
          itemStyle: {
            color: "#f4a327", 
          },
          tooltip: {
            valueFormatter: function (value) {
              return value.toLocaleString("de-DE") + " usuarios";
            },
          },
          data: AC_provinces_data.map(item => item.Puntarenas),
        },
        {
          name: "Heredia",
          type: "bar",
          itemStyle: {
            color: "#f1f856",
          },
          tooltip: {
            valueFormatter: function (value) {
              return value.toLocaleString("de-DE") + " usuarios";
            },
          },
          data: AC_provinces_data.map(item => item.Heredia),
        },
        {
          name: "Limon",
          type: "bar",
          itemStyle: {
            color: "#19f552", 
          },
          tooltip: {
            valueFormatter: function (value) {
              return value.toLocaleString("de-DE") + " usuarios";
            },
          },
          data: AC_provinces_data.map(item => item.Limon),
        },
        {
          name: "Guanacaste",
          type: "bar",
          itemStyle: {
            color: "#cf3ff9", 
          },
          tooltip: {
            valueFormatter: function (value) {
              return value.toLocaleString("de-DE") + " usuarios";
            },
          },
          data: AC_provinces_data.map(item => item.Guanacaste),
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [AC_provinces_data]);

  return <div id="AC_provinces_postpay_weekly_chart" style={{ width: "100%", height: "400px" }}></div>;
};

export default AC_provinces_postpay_weekly;
