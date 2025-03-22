import axios from 'axios';

export const getRecargasData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/VTR_prevision_recargas');
        const data = response.data?.prevision_sims?.[0]?.monto_mes_actual;

        return data !== undefined ? data : 0;
    } catch (error) {
        console.error('Error al obtener datos de recargas:', error);
        return 0;
    }
};

export const getSimsData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/VTR_prevision_SIMS');
        const data = response.data?.prevision_sims?.[0]?.monto_mes_actual;

        return data !== undefined ? data : 0;
    } catch (error) {
        console.error('Error al obtener datos de SIMs:', error);
        return 0;
    }
};
