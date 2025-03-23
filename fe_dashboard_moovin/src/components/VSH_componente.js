import React, { useEffect, useState } from 'react';
import { fetchVentasPorHora } from '../services/sims_horas_services';
import ReactECharts from 'echarts-for-react';

const VSH_componente = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchVentasPorHora().then((response) => {
      setData(response);
    });
  }, []);

  const options = {
    title: {
      text: 'Ventas de SIMs por Hora',
      subtext: 'Análisis detallado de ventas de SIMs por cada hora del día',
      left: 'center',
      textStyle: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
      },
      subtextStyle: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 14,
        color: '#666',
      },
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 12,
      },
    },
    xAxis: {
      type: 'category',
      data: data.map((item) => `${item.hora}:00`), 
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value) => value.toLocaleString('de-DE'),
      },
    },
    series: [
      {
        data: data.map((item) => item.total_sims),
        type: 'bar', 
        itemStyle: {
          color: '#47a6e6',
        },
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        height: "70%",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.45)",
        border: "1px solid rgba(58, 57, 57, 0.4)",
        justifySelf: "right",
        marginTop: "50px",
        alignContent: "center",
        alignSelf: "center",
      }}
    >
      <ReactECharts option={options} />
    </div>
  );
};

export default VSH_componente;
