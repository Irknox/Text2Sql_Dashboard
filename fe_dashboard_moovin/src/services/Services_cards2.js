import axios from 'axios';

export const fetchDataService = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/VTR_card_data');
    if (!response) throw new Error('Error al obtener los datos');
    const data = response.data;

    return {
      totalVentas: data.recargas_por_producto_dia.find(item => item.producto === "Ventas Totales")?.monto || 0,
      recargaTiempoAire: data.recargas_por_producto_dia.find(item => item.producto === "Tiempo aire")?.monto || 0,
      tarjetasFisicasColones: data.recargas_por_producto_dia.find(item => item.producto === "Tarjetas físicas colones")?.monto || 0,
      tarjetasFisicasDolares: data.recargas_por_producto_dia.find(item => item.producto === "Tarjetas físicas dólares")?.monto || 0,
      recargasCarcelariasColones: data.recargas_por_producto_dia.find(item => item.producto === "Carcelarias colones")?.monto || 0,
      recargasCarcelariasDolares: data.recargas_por_producto_dia.find(item => item.producto === "Carcelarias dólares")?.monto || 0,
      simsVendidas: data.sims_activadas_y_vendidas.find(item => item.producto === "SIMs Vendidas")?.monto || 0,
      simsActivadas: data.sims_activadas_y_vendidas.find(item => item.producto === "SIMs Activadas")?.monto || 0
    };
  } catch (error) {
    console.error('Error en el servicio de datos:', error);
    throw new Error('Error al obtener los datos del servidor');
  }
};
