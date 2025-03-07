import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const EChartComponent = ({ option }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    // Set the chart option
    chartInstance.setOption(option);

    // Resize chart on window resize
    const resizeChart = () => {
      chartInstance.resize();
    };

    window.addEventListener('resize', resizeChart);

    return () => {
      window.removeEventListener('resize', resizeChart);
      chartInstance.dispose();
    };
  }, [option]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default EChartComponent;