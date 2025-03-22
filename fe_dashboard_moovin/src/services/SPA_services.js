import axios from "axios";

export const fetchVentasSims = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/VTR_province_sims_data'); 
      console.log('Respuesta completa:', response);  
      if (response.data && response.data.ventas_sims_provincia) {
        console.log('Datos de ventas:', response.data.ventas_sims_provincia);
        return response.data.ventas_sims_provincia;
      } else {
        console.error('La clave "ventas_sims_provincia" no está presente en los datos');
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  