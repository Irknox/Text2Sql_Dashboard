export const fetch_data_usage_by_version_and_contract = async () => {
    const response = await fetch("http://localhost:8000/data_usage_os_version/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  };