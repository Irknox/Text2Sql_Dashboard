import axios from 'axios';

export const fetchVentasPorProvincia = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/VTR_province_sales');

        return response.data.ventas_por_provincia;
    } catch (error) {
        throw new Error('Error al obtener los datos de ventas por provincia');
    }
};
