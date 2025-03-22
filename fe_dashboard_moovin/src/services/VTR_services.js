import axios from "axios";

const get_VTR_SIMS_prevision = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/VTR_prevision_SIMS`
    );
    if (!response) {
      throw new Error("Error al obtener la prevision de SIMS", error);
    }
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la prevision de SIMS", error);
  }
};

const get_VTR_recargas_prevision = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/VTR_prevision_recargas`
    );
    if (!response) {
      throw new Error("Error al obtener la prevision de Recargas", error);
    }
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la prevision de Recargas", error);
  }
};

const VTR_Services = {
  get_VTR_SIMS_prevision,
  get_VTR_recargas_prevision,
};

export default VTR_Services;
