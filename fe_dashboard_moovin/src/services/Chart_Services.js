import axios from 'axios';

const Text2SQL_url = 'http://localhost:8000/text-to-sql/'; 

// Función para obtener los datos de la gráfica 1: Datos móviles usados en los últimos 10 días
export const getData_ChartData = async () => {
  try {
    const response = await axios.get(`${Text2SQL_url}/Data_Chart`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos :', error);
    throw error;
  }
};

// Función para obtener los datos de la gráfica 2: Minutos consumidos el último mes por plan y provincia
export const getMinutes_ChartData = async () => {
  try {
    const response = await axios.get(`${Text2SQL_url}/Minutes_Chart`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos :', error);
    throw error;
  }
};

// Función para obtener los datos de la gráfica 3: Satisfacción al cliente por plan (stacked bar chart)
export const getPlatform_ChartData = async () => {
  try {
    const response = await axios.get(`${Text2SQL_url}/Platform_Chart`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};

// Función para obtener los datos de la gráfica 4: Balance del último mes, mes actual, por tipo de contrato (stacked area)
export const getContract_ChartData= async () => {
  try {
    const response = await axios.get(`${Text2SQL_url}/Contract_Chart`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};

// Función para obtener los datos de la gráfica 5: Minutos y mensajes del último mes por tipo de contrato (nightingale chart)
export const getMessages_ChartData = async () => {
  try {
    const response = await axios.get(`${Text2SQL_url}/Messages_Chart`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};
