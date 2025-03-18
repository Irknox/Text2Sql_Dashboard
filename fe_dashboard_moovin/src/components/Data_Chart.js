
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData_ChartData } from '../../services/Chart_Service';  
import { setData } from '../../redux/actions';
import ECharts from 'echarts';

const  Data_Chart = () => {
  const dispatch = useDispatch();
  const Data_ChartData = useSelector((state) => state.Data_ChartData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData_ChartData();  
        dispatch(setData('Data_Chart', data));   
      } catch (error) {
        console.error('Error al cargar datos de Data_Chart', error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const chart = ECharts.init(document.getElementById('Data_Chart'));
    chart.setOption({
      title: {
        text: 'Datos móviles usados en los últimos 10 días',
      },
      tooltip: {},
      legend: {
        data: ['iOS', 'Android', 'Plan 1', 'Plan 2'],
      },
      xAxis: {
        data: Data_ChartData.dates || [],
      },
      yAxis: {},
      series: [
        {
          name: 'iOS',
          type: 'line',
          data: Data_ChartData.iosData || [],
        },
        {
          name: 'Android',
          type: 'line',
          data: Data_ChartData.androidData || [],
        },
        {
          name: 'Plan 1',
          type: 'bar',
          data: Data_ChartData.plan1Data || [],
        },
        {
          name: 'Plan 2',
          type: 'bar',
          data: Data_ChartData.plan2Data || [],
        },
      ],
    });
  }, [Data_ChartData]);

  return <div id="Data_Chart" style={{ width: '100%', height: '400px' }}></div>;
};

export default Data_Chart;
