// src/App.js
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

type tariff = {
  name: string;
  annualCost: number;
};

function App() {
  const [consumption, setConsumption] = useState("");
  const [tariffs, setTariffs] = useState<tariff[]>([]);
  const [isModal, setIsModal] = useState(false);
  useEffect(() => {
    inputRef?.current?.focus();
    setTariffs([]);
  }, [consumption]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:9000/calculate", {
      consumption: parseInt(consumption),
    });
    setTariffs(response.data);
  };
  function showModal() {
    setIsModal((prev) => (prev == false ? true : false));
  }
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <h1 className="text-center mt-6 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
        Electricity Tariff Comparison
      </h1>
      <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center my-2"
        >
          <label className="font-bold">
            Consumption (kWh/year)
            <br />
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded mt-2 outline-none"
              type="number"
              value={consumption}
              onChange={(e) => setConsumption(e.target.value)}
              required
              placeholder="Enter Consupmtion.."
              ref={inputRef}
            />
          </label>
          <button className="bg-blue-200 w-full rounded-md" type="submit">
            Calculate
          </button>
        </form>
        {tariffs.length > 0 && (
          <div className="flex flex-col justify-center border-2 items-center border-blue-500 bg-blue-200 w-1/3 rounded-lg h-1/3">
            <h2 className="font-bold underline">
              Available Tariffs for {consumption} kWh/year
            </h2>
            <ul>
              {tariffs.map((tariff: tariff, index: any) => (
                <li key={index}>
                  {tariff.name}: {tariff.annualCost.toFixed(2)} €/year
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* <button onClick={showModal}>
        {!isModal ? "Open Modal" : "Close Modal"}
      </button>
      {isModal && (
        <Modal showModal={showModal}>
          <h1>Hello modal</h1>
        </Modal>
      )} */}
      </div>
    </>
  );
}

export default App;
