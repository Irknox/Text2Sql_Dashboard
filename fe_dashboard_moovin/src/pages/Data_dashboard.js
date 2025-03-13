import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from '../slices/chartSlice';
import { fetch_data_usage } from '../slices/data_usage_os_version';
import * as echarts from 'echarts';

const Data_dashboard = () => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.chart.data);
  const chartStatus = useSelector((state) => state.chart.status);
  const dataUsage = useSelector((state) => state.dataUsage.data);
  const dataUsageStatus = useSelector((state) => state.dataUsage.status);

  useEffect(() => {
    dispatch(fetchChartData(25));  
    dispatch(fetch_data_usage());
  }, [dispatch]);

  useEffect(() => {
    if (chartData) {
      const chart = echarts.init(document.getElementById("pieChart"));
      const options = {
        title: { text: "Distribución de Provincias (Age > 20)", left: "center", style: { color: "#FFFFFF" } },
        tooltip: { trigger: "item" },
        legend: { orient: "vertical", left: "left" },
        series: [
          {
            name: "Personas",
            type: "pie",
            radius: "50%",
            data: chartData,
            emphasis: {
              itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: "rgba(0, 0, 0, 0.5)" },
            },
          },
        ],
      };
      console.log(chartData);
      
      chart.setOption(options);
    }
  }, [chartData]);

  useEffect(() => {
    if (dataUsage) {
      const chart = echarts.init(document.getElementById("barChart"));
      const options = {
        title: { text: dataUsage.title.text},
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { data: dataUsage.legend.data },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'value', boundaryGap: [0, 0.01] },
        yAxis: { type: dataUsage.yAxis.type, data: dataUsage.yAxis.data },
        series: dataUsage.series,
      };
      console.log(dataUsage);
      
      chart.setOption(options);
    }
  }, [dataUsage]);

  return (
    <div className='first_dashboard_container'>
      <h1>Dashboard de Datos</h1>
      <div id="pieChart" style={{ width: "600px", height: "400px" }}></div>
      {chartStatus === 'loading' && <p>Cargando datos...</p>}
      {chartStatus === 'failed' && <p>Error al cargar los datos.</p>}
      
      <div id="barChart" style={{ width: "600px", height: "400px" }}></div>
      {dataUsageStatus === 'loading' && <p>Cargando datos de uso...</p>}
      {dataUsageStatus === 'failed' && <p>Error al cargar los datos de uso.</p>}
    </div>
  );
};

export default Data_dashboard;