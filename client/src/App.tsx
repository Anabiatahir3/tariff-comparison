// src/App.js
import React, { useState } from "react";
import axios from "axios";

type tariff = {
  name: string;
  annualCost: number;
};

function App() {
  const [consumption, setConsumption] = useState("");
  const [tariffs, setTariffs] = useState<tariff[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:9000/calculate", {
      consumption: parseInt(consumption),
    });
    setTariffs(response.data);
  };

  return (
    <div className="App">
      <h1>Electricity Tariff Comparison</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Consumption (kWh/year):
          <input
            type="number"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
            required
          />
        </label>
        <button type="submit">Calculate</button>
      </form>
      <h2>Available Tariffs</h2>
      <ul>
        {tariffs.map((tariff: tariff, index: any) => (
          <li key={index}>
            {tariff.name}: {tariff.annualCost.toFixed(2)} €/year
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
