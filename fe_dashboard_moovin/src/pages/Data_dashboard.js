import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useState } from "react";
import { fetch_specific_data } from "@/services/text2sql";
import EChartComponent from "../components/Firts_Chart";

const Dashboard_page = () => {
  const [graphic_requested, setGraphic_requested] = useState("Haz una lista con todos los clientes que ingresaron en el 2023, ordena la grafica por mes");
  const [chartOption, setChartOption] = useState(null);

  const send_request = async () => {
    try {
      const response = await fetch_specific_data(graphic_requested);
      console.log("Data", response);


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
          <TextField id="graphic-input"  variant="outlined" placeholder="Grafica a construir " />
          <Button variant="contained" onClick={send_request}>Solicitar</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_page;