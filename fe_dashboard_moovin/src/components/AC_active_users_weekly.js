import React, { useEffect, useState, useRef } from "react";
import * as echarts from "echarts";
import AC_Services from "../services/AC_services";

const AC_active_users_weekly = () => {
  const [prepayData, setPrepayData] = useState([]);
  const [postpayData, setPostpayData] = useState([]);

  const chartRef = useRef(null);

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
        text: "Usuarios Activos por Semana - Últimos 2 Meses",
        subtext: "Comparación entre Usuarios Prepago y Postpago",
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
      },
      legend: {
        data: ["Usuarios Prepago", "Usuarios Postpago"],
        top: "bottom",
        textStyle: {
          fontSize: 14,
          fontFamily: "'Arial', sans-serif",
        },
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
        data: xAxisData,
        splitLine: { show: false },
        axisLabel: {
          fontSize: 12,
          fontFamily: "'Arial', sans-serif",
        },
      },
      yAxis: {
        type: "value",
        name: "Usuarios Activos",
        nameTextStyle: {
          fontSize: 14,
          fontFamily: "'Arial', sans-serif",
        },
        axisLabel: {
          fontSize: 12,
          fontFamily: "'Arial', sans-serif",
        },
      },
      series: [
        {
          name: "Usuarios Prepago",
          type: "bar",
          data: prepayValues,
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
          data: postpayValues,
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

    return () => {
      myChart.dispose();
    };
  }, [prepayData, postpayData]);

  return (
    <div
      id="active_users_chart"
      style={{
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.45)",
        border: "1px solid rgba(58, 57, 57, 0.4)",
        justifySelf: "center",
        width: "85%",
        height: "350px",
        padding: "20px",
      }}
    ></div>
  );
};

export default AC_active_users_weekly;
