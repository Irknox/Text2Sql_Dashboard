import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages_ChartData } from '../../services/chart.service';  
import { setData } from '../../redux/actions';
import ECharts from 'echarts';

const Messages_Chart = () => {
  const dispatch = useDispatch();
  const Messages_ChartData = useSelector((state) => state.Messages_ChartData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMessages_ChartData();  
        dispatch(setData('Messages_Chart', data));   
      } catch (error) {
        console.error('Error al cargar datos de Messages_Chart', error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const chart = ECharts.init(document.getElementById('Messages_1'));
    chart.setOption({
      title: {
        text: 'Minutos y mensajes del último mes por tipo de contrato',
      },
      tooltip: {},
      angleAxis: {
        type: 'category',
        data: Messages_ChartData.contractTypes || [],
      },
      radiusAxis: {},
      series: [
        {
          type: 'pie',
          radius: ['30%', '70%'],
          data: Messages_ChartData.minutes || [],
          coordinateSystem: 'polar',
        },
        {
          type: 'pie',
          radius: ['30%', '70%'],
          data: Messages_ChartData.messages || [],
          coordinateSystem: 'polar',
        },
      ],
    });
  }, [Messages_ChartData]);

  return <div id="chart5" style={{ width: '100%', height: '400px' }}></div>;
};

export default Messages_Chart;
