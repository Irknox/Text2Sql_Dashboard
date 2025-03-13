import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlatform_ChartData } from '../../services/Chart_Service';  
import { setData } from '../../redux/actions';
import ECharts from 'echarts';

const Platform_Chart = () => {
  const dispatch = useDispatch();
  const Platform_ChartData = useSelector((state) => state.Platform_ChartData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlatform_ChartData();  
        dispatch(setData('Platform', data));  
      } catch (error) {
        console.error('Error al cargar datos', error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const chart = ECharts.init(document.getElementById('Platform_Chart'));
    chart.setOption({
      title: {
        text: 'Satisfacción al cliente por plan (Pospago, Prepago, Empresarial)',
      },
      tooltip: {},
      polar: {
        radius: ['30%', '70%'],
      },
      angleAxis: {
        type: 'category',
        data: Platform_ChartData.plans || [],
      },
      radiusAxis: {},
      series: [
        {
          type: 'bar',
          data: Platform_ChartData.satisfaction || [],
          coordinateSystem: 'polar',
          stack: 'a',
        },
      ],
    });
  }, [Platform_ChartData]);

  return <div id="chart3" style={{ width: '100%', height: '400px' }}></div>;
};

export default Platform_Chart;
