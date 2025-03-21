// components/VentasPorHora.js
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
      text: 'Ventas por Hora (SIMs)',
      subtext: 'Ventas de SIMs por cada hora del día',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: data.map((item) => `${item.hora}:00`), 
    },
    yAxis: {
      type: 'value',
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
    <div style={{ width: '100%', height: '600' }}>
      <ReactECharts option={options} />
    </div>
  );
};

export default VSH_componente;
