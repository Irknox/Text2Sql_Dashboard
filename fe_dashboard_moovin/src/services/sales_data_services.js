import axios from "axios";

async function fetch_sales_data() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/sales_data");
    if (response) {
      console.log("Datos obtenidos:", response.data);
        return response.data;
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

export { fetch_sales_data };