import axios from 'axios';

export const getBalanceData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/balance_available/');        
        if (response) {
            return response.data.Monto;
        }
    } catch (err) {
        console.error(err);
        throw new Error('Error al obtener el balance disponible');
    }
};

export const getCurrentSalesData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/current_sales/');
        if (response) {
            return response.data;
        }
        console.error('Error al obtener las ventas actuales');
    } catch (err) {
        console.error(err);
        throw new Error('Error al obtener las ventas actuales');
    }
};

export const getSalesVariationData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/sales_variation/');
        if (response) {
            return response.data;
        }
        console.error('Error al obtener la variación de ventas');
    } catch (err) {
        console.error(err);
        throw new Error('Error al obtener la variación de ventas');
    }
};