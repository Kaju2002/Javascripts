import React, { useState, useEffect } from "react";

const CurrencyConverter = ({ countryCurrencyCode }) => {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [rate, setRate] = useState(null);
  const [error, setError] = useState(null);

  // Fetch exchange rate when the component mounts or currency changes
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${countryCurrencyCode}`
        );
        const data = await response.json();
        setRate(data.rates[targetCurrency]);
        setConvertedAmount((amount * data.rates[targetCurrency]).toFixed(2));
      } catch (err) {
        setError("Failed to fetch exchange rates. Please try again later.");
      }
    };

    if (countryCurrencyCode && targetCurrency) {
      fetchExchangeRate();
    }
  }, [countryCurrencyCode, targetCurrency, amount]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTargetCurrencyChange = (e) => {
    setTargetCurrency(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-xl mt-12">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Currency Converter
      </h2>

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="text-lg font-semibold text-gray-700">Enter Amount</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full mt-2 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Convert to Currency Dropdown */}
        <div>
          <label className="text-lg font-semibold text-gray-700">Convert to</label>
          <select
            value={targetCurrency}
            onChange={handleTargetCurrencyChange}
            className="w-full mt-2 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">British Pound (GBP)</option>
            <option value="INR">Indian Rupee (INR)</option>
            <option value="LKR">Sri Lankan Rupee (LKR)</option>
            {/* Add more currencies as needed */}
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-lg text-center mt-4">{error}</div>
        )}

        {/* Result Display */}
        {!error && (
          <div className="text-lg mt-4 text-center">
            <strong>
              {amount} {countryCurrencyCode} = {convertedAmount} {targetCurrency}
            </strong>
          </div>
        )}

        {/* Get Exchange Rate Button */}
        <div className="flex justify-center">
          <button
            className="w-full mt-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition duration-300"
            onClick={() => setAmount(1)} // Reset the amount on button click
          >
            Get Exchange Rate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
// AIzaSyC2p3iebLouqzTkIx0YOwKUXEbAyhLNPgs