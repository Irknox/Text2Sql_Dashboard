import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContract_ChartData } from '../../services/Chart_Service'; 
import { setData } from '../../redux/actions';
import ECharts from 'echarts';

const Contract_Chart = () => {
  const dispatch = useDispatch();
  const  Contract_ChartData = useSelector((state) => state. Contract_ChartData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContract_ChartData();  
        dispatch(setData(' Contract_Chart', data));  
      } catch (error) {
        console.error('Error al cargar datos de  Contract_Chart', error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const chart = ECharts.init(document.getElementById(' Contract_Chart'));
    chart.setOption({
      title: {
        text: 'Balance del último mes, mes actual, por tipo de contrato',
      },
      tooltip: {},
      legend: {
        data:  Contract_ChartData.contractTypes || [],
      },
      xAxis: {
        data:  Contract_ChartData.months || [],
      },
      yAxis: {},
      series: Contract_ChartData.series || [],
    });
  }, [Contract_ChartData]);

  return <div id="Contract_Chart" style={{ width: '100%', height: '400px' }}></div>;
};

export default Contract_Chart;
