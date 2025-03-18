import axios from 'axios';

export const getBalanceData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/balance_available/');
        console.log(response.data);
    
        return response.data.balance_available || 'N/A';
    } catch (err) {
        console.error(err);
        throw new Error('Error al obtener el balance disponible');
    }
};

export const getCurrentSalesData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/current_sales/');
        console.log(response.data);
        return response.data.current_sales || 'N/A';
    } catch (err) {
        console.error(err);
        
        throw new Error('Error al obtener las ventas actuales');
    }
};

export const getSalesVariationData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/sales_variation/');
        console.log(response.data);
        return response.data.sales_variation || 'N/A';
    } catch (err) {
        console.error(err);
        throw new Error('Error al obtener la variación de ventas');
    }
};