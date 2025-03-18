import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMinutes_ChartData } from '../../services/chart.service';  
import { setData } from '../../redux/actions';
import ECharts from 'echarts';

const Minutes_Chart = () => {
  const dispatch = useDispatch();
  const Minutes_ChartData = useSelector((state) => state.Minutes_ChartData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMinutes_ChartData();  
        dispatch(setData('Minutes_chart', data));   // Despacha los datos a Redu
      } catch (error) {
        console.error('Error al cargar datos de Minutes_Chart', error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const chart = ECharts.init(document.getElementById('Minutes_Chart'));
    chart.setOption({
      title: {
        text: 'Minutos consumidos el último mes por plan y provincia',
      },
      tooltip: {},
      legend: {
        data: Minutes_ChartData.plans || [],
      },
      xAxis: {
        data: Minutes_ChartData.provinces || [],
      },
      yAxis: {},
      series: Minutes_ChartData.series || [],
    });
  }, [Minutes_ChartData]);

  return <div id="chart2" style={{ width: '100%', height: '400px' }}></div>;
};

export default Minutes_Chart;
