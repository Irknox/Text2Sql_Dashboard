import axios from "axios";

async function fetch_sales_data() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/sales_data");
    if (response) {
        return response;
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

export { fetch_sales_data };