import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from '../slices/chartSlice';
import * as echarts from 'echarts';

const Data_dashboard = () => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.chart.data);
  const chartStatus = useSelector((state) => state.chart.status);

  useEffect(() => {
    dispatch(fetchChartData(25));  
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
      chart.setOption(options);
    }
  }, [chartData]);

  return (
    <div>
      <h1>Dashboard de Datos</h1>
      <div id="pieChart" style={{ width: "600px", height: "400px" }}></div>
      {chartStatus === 'loading' && <p>Cargando datos...</p>}
      {chartStatus === 'failed' && <p>Error al cargar los datos.</p>}
    </div>
  );
};

export default Data_dashboard;