const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
app.use(cors());
app.use(express.json());

const tariffs = [
  {
    name: "Product A",
    type: 1,
    baseCost: 5,
    additionalKwhCost: 22,
    tariffName: "Basic Electricity Tariff",
  },
  {
    name: "Product B",
    type: 2,
    includedKwh: 4000,
    baseCost: 800,
    additionalKwhCost: 30,
    tariffName: "Packaged Tariff",
  },
];

// Calculate annual costs based on tariff type
const calculateAnnualCost = (tariff, consumption) => {
  if (tariff.type === 1) {
    return (
      tariff.baseCost * 12 + consumption * (tariff.additionalKwhCost / 100)
    );
  } else if (tariff.type === 2) {
    if (consumption <= tariff.includedKwh) {
      return tariff.baseCost;
    } else {
      return (
        tariff.baseCost +
        (consumption - tariff.includedKwh) * (tariff.additionalKwhCost / 100)
      );
    }
  }
  return 0;
};
// Endpoint to get tariffs based on consumption
app.post("/calculate", (req, res) => {
  const consumption = req.body.consumption;

  const results = tariffs.map((tariff) => {
    return {
      name: tariff.tariffName,
      annualCost: parseInt(calculateAnnualCost(tariff, consumption)),
    };
  });

  res.json(results);
});
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
