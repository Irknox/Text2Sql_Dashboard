import axios from 'axios';

const Text2SQL_url = 'http://localhost:8000/text-to-sql/';

export const fetch_specific_data = async (text) => {
  try {
    const response = await axios.post(Text2SQL_url, { text });
    return response.data;
  } catch (error) {
    console.error('Error fetching SQL query:', error);
    throw error;
  }
};