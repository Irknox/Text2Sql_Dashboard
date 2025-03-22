import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import AC_Services from "../services/AC_services";

const AC_active_users_weekly = () => {
  const [prepayData, setPrepayData] = useState([]);
  const [postpayData, setPostpayData] = useState([]);

  useEffect(() => {
    AC_Services.get_prepay_active_weekly()
      .then((response) => {
        setPrepayData(response.prepago_activos_por_semana); 
      })
      .catch((error) => {
        console.log("Error obteniendo datos de prepagos:", error);
      });


    AC_Services.get_postpay_active_weekly()
      .then((response) => {
        setPostpayData(response.postpago_activos_por_semana); 
      })
      .catch((error) => {
        console.log("Error obteniendo datos de postpagos:", error);
      });
  }, []);

  useEffect(() => {
    if (prepayData.length === 0 || postpayData.length === 0) return;

    const chartDom = document.getElementById("active_users_chart");
    const myChart = echarts.init(chartDom);

    const xAxisData = prepayData.map((item) => `Semana ${item.semana}`);


    const prepayValues = prepayData.map((item) => item.cantidad);
    const postpayValues = postpayData.map((item) => item.cantidad);


    const option = {
      title: {
        text: "Usuarios Activos ultimos 2 meses",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Usuarios Prepago", "Usuarios Postpago"],
        top: "bottom",
      },
      toolbox: {
        feature: {
          magicType: { type: ["stack"] },
          dataView: {},
          saveAsImage: { pixelRatio: 2 },
        },
      },
      xAxis: {
        type: "category",
        data: xAxisData, // Horas del día
        splitLine: { show: false },
      },
      yAxis: {
        type: "value",
        name: "Usuarios Activos",
      },
      series: [
        {
          name: "Usuarios Prepago",
          type: "bar",
          data: prepayValues, // Datos de prepagos
          emphasis: {
            focus: "series",
          },
          itemStyle: {
            color: "#0bf084", // Color para barras de prepagos
          },
          animationDelay: (idx) => idx * 10,
        },
        {
          name: "Usuarios Postpago",
          type: "bar",
          data: postpayValues, // Datos de postpagos
          emphasis: {
            focus: "series",
          },
          itemStyle: {
            color: "#3e0bf0", // Color para barras de postpagos
          },
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: (idx) => idx * 5,
    };

    myChart.setOption(option);

    // Limpiar el gráfico al desmontar el componente
    return () => {
      myChart.dispose();
    };
  }, [prepayData, postpayData]); // Actualizar gráfico cuando cambien los datos

  return <div id="active_users_chart" style={{ width: "100%", height: "400px" }}></div>;
};

export default AC_active_users_weekly;
