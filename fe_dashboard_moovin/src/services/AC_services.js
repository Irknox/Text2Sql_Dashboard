import axios from "axios";

const get_prepay_active_24h = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/AC_prepay_active_24h`
    );
    if (!response) {
      throw new Error("Error al obtener los datos: prepagos activos 24h", error);
    }
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los datos: prepagos activos 24h", error);
  }
};

const get_postpay_active_24h = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/AC_postpay_active_24h`
      );
      if (!response) {
        throw new Error("Error al obtener los datos: postpagos activos 24h", error);
      }
      
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los datos: postpagos activos 24h", error);
    }
  };


const get_postpay_active_weekly = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/AC_postpay_active_weekly`
      );
      if (!response) {
        throw new Error("Error al obtener los datos: postpagos activos semanal", error);
      }
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los datos:  postpagos activos semanal", error);
    }
};


const get_prepay_active_weekly = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/AC_prepay_active_weekly`
      );
      if (!response) {
        throw new Error("Error al obtener los datos: prepagos activos semanal", error);
      }
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los datos:  prepagos activos semanal", error);
    }
};

const get_province_prepay_active_weekly = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/AC_province_prepay_active_weekly`
      );
      if (!response) {
        throw new Error("Error al obtener los datos: prepagos activos semanal por provincia", error);
      }
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los datos:  prepagos activos semanal por provincia", error);
    }
};

const get_province_postpay_active_weekly = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/AC_province_postpay_active_weekly`
      );
      if (!response) {
        throw new Error("Error al obtener los datos: postpagos activos semanal por provincia", error);
      }
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los datos:  postpagos activos semanal por provincia", error);
    }
};


const AC_Services = {
    get_prepay_active_24h,
    get_postpay_active_24h,
    get_postpay_active_weekly,
    get_prepay_active_weekly,
    get_province_prepay_active_weekly,
    get_province_postpay_active_weekly
};

export default AC_Services;