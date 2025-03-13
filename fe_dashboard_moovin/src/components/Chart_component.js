import { useEffect } from "react";
import * as echarts from "echarts";

const Chart_component = ({ chartData }) => {
  useEffect(() => {
    if (chartData) {
      const chart = echarts.init(document.getElementById("pieChart"));
      
      // Configuración de ECharts basada en los datos
      const options = {
        title: { text: "Distribución de Provincias (Age > 20)", left: "center", style: { color: "#FFFFFF" } },
        tooltip: { trigger: "item" },
        legend: { orient: "vertical", left: "left" },
        series: [
          {
            name: "Personas",
            type: "pie",  // O el tipo de gráfico que el usuario haya seleccionado
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

  return <div id="pieChart" style={{ width: "600px", height: "400px" }}></div>;
};

export default Chart_component;
