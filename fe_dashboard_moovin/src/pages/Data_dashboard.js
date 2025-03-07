import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useState } from "react";
import { fetch_specific_data } from "@/services/text2sql";
import EChartComponent from "../components/Firts_Chart";

const Dashboard_page = () => {
  const [graphic_requested, setGraphic_requested] = useState("");
  const [chartOption, setChartOption] = useState(null);

  const send_request = async () => {
    try {
      const response = await fetch_specific_data(graphic_requested);
      console.log("Data", response.results);
      
      const load_base_data =()=> {
      const datos=[];
      response.results.forEach((element) => {datos.push(element.fecha_ingreso)})
      return datos;
      }
      const load_data=()=>{
        const datos=[];
        response.results.forEach((element) => {datos.push(element.nombre)})
        return datos;
      }

      // Aquí puedes transformar los datos recibidos en las opciones del gráfico
      const option = {
        title: {
          text: 'Ejemplo de Gráfico'
        },
        tooltip: {},
        xAxis: {
          data: load_base_data()
        },
        yAxis: {},
        series: [{
          name: '',
          type: 'bar',
          data: load_data()
        }]
      };

      setChartOption(option);
    } catch (error) {
      console.error('Error fetching SQL query:', error);
    }
  }

  return (
    <div className="dashboard-body">
      <div className="graphic-container">
        <div className="graphic">
          {chartOption && <EChartComponent option={chartOption} />}
        </div>
        <div className="graphic-input">
          <TextField id="graphic-input" onChange={e => setGraphic_requested(e.target.value)} variant="outlined" placeholder="Grafica a construir " />
          <Button variant="contained" onClick={send_request}>Solicitar</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_page;