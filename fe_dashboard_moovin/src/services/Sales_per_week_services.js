import axios from "axios";

async function fetch_sales_per_week_data() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/sales_per_week");
    if (response) {
        return response.data;
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

export { fetch_sales_per_week_data};