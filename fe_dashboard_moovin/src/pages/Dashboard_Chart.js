import React from 'react';
import Data_Chart from '../components/Data_Chart';
import Minutes_Chart from '../components/Minutes_Chart';
import Platform_Chart from '../components/Platform_Chart';
import Contract_Chart from '../components/Contract_Chart';
import Messages_Chart from '../components/Messages_Chart';

const Dashboard_Chart = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard de Gráficas</h1>
      <div style={{ marginBottom: '30px' }}>
        <h2>Gráfica 1: Datos Móviles Usados</h2>
        <Data_Chart />
      </div>
      <div style={{ marginBottom: '30px' }}>
        <h2>Gráfica 2: Minutos Consumidos por Plan y Provincia</h2>
        <Minutes_Chart />
      </div>
      <div style={{ marginBottom: '30px' }}>
        <h2>Gráfica 3: Satisfacción al Cliente</h2>
        <Platform_Chart />
      </div>
      <div style={{ marginBottom: '30px' }}>
        <h2>Gráfica 4: Balance por Tipo de Contrato</h2>
        <Contract_Chart />
      </div>
      <div style={{ marginBottom: '30px' }}>
        <h2>Gráfica 5: Minutos y Mensajes por Tipo de Contrato</h2>
        <Messages_Chart/>
      </div>
    </div>
  );
};

export default Dashboard_Chart;
