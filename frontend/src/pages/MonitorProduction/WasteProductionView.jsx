// WasteProductionView.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Button, Label, Select } from 'flowbite-react';

const WasteProductionView = ({
  userWasteData,
  chartType,
  activeWasteType,
  handleGraphSelection,
  selectedPeriod,
  setSelectedPeriod,
  error,
  handleSubmit,
  highWasteAlert,
}) => {
  const chartData = {
    labels: ['Organic', 'Dry', 'Wet'],
    datasets: [
      {
        label: 'Waste Breakdown (kg)',
        data: [
          userWasteData.filter((item) => item.wasteType === 'Organic').length,
          userWasteData.filter((item) => item.wasteType === 'dry').length,
          userWasteData.filter((item) => item.wasteType === 'wet').length,
        ],
        backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'],
      },
    ],
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Waste Production View</h1>

      {/* Display alert if high waste production is detected */}
      {highWasteAlert && (
        <div className="bg-red-500 text-white p-4 mb-4">
          High waste alert! You have exceeded the waste threshold.
        </div>
      )}

      {/* Display error if there's any */}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <Label htmlFor="period" className="block mb-2 text-sm font-medium">
          Select Time Period
        </Label>
        <Select
          id="period"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </Select>
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>

      {/* Render the chart based on chartType */}
      {chartType === 'bar' ? (
        <Bar data={chartData} />
      ) : (
        <Pie data={chartData} />
      )}
    </div>
  );
};

export default WasteProductionView;
