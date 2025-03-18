import { useState } from "react";

const CustomChartForm = ({ onSubmit }) => {
  const [chartType, setChartType] = useState("pie");
  const [xAxis, setXAxis] = useState("provincia");
  const [ageFilter, setAgeFilter] = useState(">20");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Recopilar los datos del formulario
    const formData = {
      chart_type: chartType,
      x_axis: xAxis,
      age_filter: ageFilter,
    };
    onSubmit(formData); // Llamar a la función para enviar los datos al backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Tipo de gráfico:
          <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="pie">Tarta</option>
            <option value="bar">Barras</option>
            <option value="line">Líneas</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Eje X:
          <select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
            <option value="provincia">Provincia</option>
            <option value="age">Edad</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Filtro de Edad:
          <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
            <option value=">20">Mayor a 20</option>
            <option value="<20">Menor a 20</option>
          </select>
        </label>
      </div>

      <button type="submit">Generar gráfico</button>
    </form>
  );
};
