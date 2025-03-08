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

    // Datos proporcionados
const clientes = [
  { id_cliente: 1, nombre: "Juan", fecha_ingreso: "2023-01-10" },
  { id_cliente: 2, nombre: "María", fecha_ingreso: "2023-02-15" },
  { id_cliente: 3, nombre: "Carlos", fecha_ingreso: "2023-03-20" },
  { id_cliente: 4, nombre: "Ana", fecha_ingreso: "2023-04-25" },
  { id_cliente: 5, nombre: "Pedro", fecha_ingreso: "2023-05-30" },
  { id_cliente: 6, nombre: "Sofía", fecha_ingreso: "2023-06-05" },
  { id_cliente: 7, nombre: "Diego", fecha_ingreso: "2023-06-10" },
  { id_cliente: 8, nombre: "Diego", fecha_ingreso: "2023-07-10" }
];

// Procesar datos para agrupar clientes por mes
const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const conteoPorMes = Array(12).fill(0);

clientes.forEach(cliente => {
  const mes = new Date(cliente.fecha_ingreso).getMonth(); // Extraer el mes (0-11)
  conteoPorMes[mes]++;
});

// Configuración de ECharts
const option = {
  title: {
      text: 'Clientes ingresados por mes'
  },
  tooltip: {},
  xAxis: {
      type: 'category',
      data: meses.slice(0, 7) // Mostramos solo los meses con datos
  },
  yAxis: {
      type: 'value'
  },
  series: [
      {
          name: 'Clientes',
          type: 'bar',
          data: conteoPorMes.slice(0, 7) // Solo los meses con datos
      }
  ]
};


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