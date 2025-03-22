export const fetchVentasPorHora = () => {
    return new Promise((resolve) => {
      const data = [
        { "hora": 8, "total_sims": 103 },
        { "hora": 9, "total_sims": 118 },
        { "hora": 10, "total_sims": 105 },
        { "hora": 11, "total_sims": 90 },
        { "hora": 12, "total_sims": 110 },
        { "hora": 13, "total_sims": 80 },
        { "hora": 14, "total_sims": 112 },
        { "hora": 15, "total_sims": 56 },
      ];
      resolve(data);
    });
  };
  
  // services/recargas_horas
  const obtenerVentasPorHora = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/VTR_recarga_by_hour');
        const data = await response.json();
        return data.ventas_recargas_por_hora;
    } catch (error) {
        console.error('Error al obtener las ventas por hora:', error);
        return [];
    }
};

export default obtenerVentasPorHora;
