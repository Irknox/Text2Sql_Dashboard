// src/services/dataService.js
import axios from 'axios';

// URL base de tu API (ajústalo según sea necesario)
const API_URL = 'http://localhost:8000/api/data';  // Cambia esta URL por la correcta

// Función para obtener los datos de la gráfica 1: Datos móviles usados en los últimos 10 días
export const getChart1Data = async () => {
  try {
    const response = await axios.get(`${API_URL}/chart1`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de Chart1:', error);
    throw error;
  }
};

// Función para obtener los datos de la gráfica 2: Minutos consumidos el último mes por plan y provincia
export const getChart2Data = async () => {
  try {
    const response = await axios.get(`${API_URL}/chart2`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de Chart2:', error);
    throw error;
  }
};

// Función para obtener los datos de la gráfica 3: Satisfacción al cliente por plan (stacked bar chart)
export const getChart3Data = async () => {
  try {
    const response = await axios.get(`${API_URL}/chart3`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de Chart3:', error);
    throw error;
  }
};

// Función para obtener los datos de la gráfica 4: Balance del último mes, mes actual, por tipo de contrato (stacked area)
export const getContract_ChartData= async () => {
  try {
    const response = await axios.get(`${API_URL}/chart4`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de Chart4:', error);
    throw error;
  }
};

// Función para obtener los datos de la gráfica 5: Minutos y mensajes del último mes por tipo de contrato (nightingale chart)
export const getChart5Data = async () => {
  try {
    const response = await axios.get(`${API_URL}/chart5`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de Chart5:', error);
    throw error;
  }
};
