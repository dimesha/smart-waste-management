import { useState, useEffect } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { Bar, Pie } from "react-chartjs-2";
import Swal from "sweetalert2";
import background from "../assets/background.png";
import "chart.js/auto";
import axios from "axios";

export default function WasteProduction() {
  const [currentUser, setCurrentUser] = useState(null);
  const [wasteData, setWasteData] = useState(null);
  const [userWasteData, setUserWasteData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [error, setError] = useState("");
  const [chartType, setChartType] = useState("bar");
  const [activeWasteType, setActiveWasteType] = useState("organic");
  const [highWasteAlert, setHighWasteAlert] = useState(false); // State for high waste alert


  useEffect(() => {
    const fetchWasteData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/qr/get-all-waste"
        );
        console.log("Fetched data:", response.data);
        setUserWasteData(response.data);
        // Check for high waste levels
        // const totalWaste = response.data.reduce((sum, item) => sum + item.weight, 0);
        if (totalWasteCount >= 100) { // Set threshold for high waste
          setHighWasteAlert(true); // Trigger alert if above threshold
        }
      } catch (error) {
        console.error("Error fetching waste data:", error);
      }
    };
    fetchWasteData();
  }, []);
  const organicWaste = userWasteData.filter(
    (item) =>
      currentUser &&
      currentUser.Name === item.owner &&
      item.wasteType === "Organic"
  );
  const dryWaste = userWasteData.filter(
    (item) =>
      currentUser && currentUser.Name === item.owner && item.wasteType === "dry"
  );
  const wetWaste = userWasteData.filter(
    (item) =>
      currentUser && currentUser.Name === item.owner && item.wasteType === "wet"
  );

  const totalOrganicWeight = organicWaste.reduce(
    (total, item) => total + item.weight,
    0
  );
  const totalDryWeight = dryWaste.reduce(
    (total, item) => total + item.weight,
    0
  );
  const totalWetWeight = wetWaste.reduce(
    (total, item) => total + item.weight,
    0
  );

  const totalWasteCount = totalOrganicWeight + totalDryWeight + totalWetWeight;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setCurrentUser(user);
    }
  }, []);

  const calculateWasteBreakdown = () => {
    const breakdown = { organic: 0, dry: 0, wet: 0 };

    userWasteData.forEach((item) => {
      if (currentUser && currentUser.Name === item.owner) {
        breakdown[item.wasteType.toLowerCase()] += item.weight;
      }
    });

    return breakdown;
  };

  const wasteBreakdown = calculateWasteBreakdown();

  const fetchWasteData = (period) => {
    if (period === "") {
      setError(
        "Invalid time-period selected. Please choose a valid date range."
      );
      return;
    }
    const data = {
      total: 100,
      breakdown: { organic: 40, recyclable: 30, hazardous: 30 },
    };
    setWasteData(data);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWasteData(selectedPeriod);
  };

  const handleGraphSelection = (type) => {
    if (!wasteData) {
      Swal.fire("No data to display!", "Please fetch data first", "warning");
      return;
    }
    setChartType(type);
  };
  const chartData = {
    labels: ["Organic", "Dry", "Wet"],
    datasets: [
      {
        label: "Waste Breakdown (kg)",
        data: [wasteBreakdown.organic, wasteBreakdown.dry, wasteBreakdown.wet],
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
      },
    ],
  };

  const handleCheckWasteLevels = () => {
    // This function is called when the user wants to check waste levels
    if (userWasteData.length === 0) {
      Swal.fire("No waste data available!", "Please try again later.", "info");
    } else {
      // Display current waste levels
    //   const totalWaste = userWasteData.reduce((sum, item) => sum + item.weight, 0);
      Swal.fire("Current Waste Production", `Total Waste: ${totalWasteCount} kg`, "info");
    }
  };

  return (
    <div
      className="flex lg:flex-row flex-col justify-between gap-8 p-8 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full lg:w-1/2 flex flex-col items-center glassmorphism rounded-lg shadow-lg bg-white/30 backdrop-filter backdrop-blur-lg border border-white/20 p-7 lg:h-2/3">
        <h2 className="text-2xl font-bold mb-5">Monitor Waste Production</h2>
         {/* Button to check waste levels */}
         <Button onClick={handleCheckWasteLevels} className="mb-5" gradientDuoTone="greenToBlue">
          Check My Waste Levels
        </Button>

        {highWasteAlert && (
          <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
            <p className="font-bold">Alert!</p>
            <p>Your waste production levels are high. Please check your waste levels!</p>
          </div>
        )}
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <Label htmlFor="selectedDate">Select Date Range:</Label>
            <Select
              id="selectedDate"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </Select>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            gradientDuoTone="greenToBlue"
          >
            Retrieve Data
          </Button>
        </form>

        <div className="bg-white bg-opacity-40 rounded-lg shadow-lg p-6 w-full overflow-auto h-auto md:max-h-screen mt-5">
          <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
            User Waste List Details
          </h3>

          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setActiveWasteType("organic")}
              className={`px-4 py-2 rounded-lg font-bold ${
                activeWasteType === "organic"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              Organic Waste
            </button>
            <button
              onClick={() => setActiveWasteType("dry")}
              className={`px-4 py-2 rounded-lg font-bold ${
                activeWasteType === "dry"
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              Dry Waste
            </button>
            <button
              onClick={() => setActiveWasteType("wet")}
              className={`px-4 py-2 rounded-lg font-bold ${
                activeWasteType === "wet"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              Wet Waste
            </button>
          </div>

          {activeWasteType === "organic" && (
            <div>
              <h4 className="text-xl font-bold mb-2">Organic Waste</h4>
              <p>Total Organic Waste: {totalOrganicWeight} kg</p>
              {organicWaste.map((item) => (
                <div
                  key={item._id}
                  className="bg-white hover:bg-green-100 p-4 mb-4 rounded-lg shadow-md"
                >
                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p>
                    <strong>Weight:</strong> {item.weight} kg
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeWasteType === "dry" && (
            <div>
              <h4 className="text-xl font-bold mb-2">Dry Waste</h4>
              <p>Total Dry Waste: {totalDryWeight} kg</p>
              {dryWaste.map((item) => (
                <div
                  key={item._id}
                  className="bg-white hover:bg-yellow-100 p-4 mb-4 rounded-lg shadow-md"
                >
                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p>
                    <strong>Weight:</strong> {item.weight} kg
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeWasteType === "wet" && (
            <div>
              <h4 className="text-xl font-bold mb-2">Wet Waste</h4>
              <p>Total Wet Waste: {totalWetWeight} kg</p>
              {wetWaste.map((item) => (
                <div
                  key={item._id}
                  className="bg-white hover:bg-blue-100 p-4 mb-4 rounded-lg shadow-md"
                >
                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p>
                    <strong>Weight:</strong> {item.weight} kg
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center glassmorphism rounded-lg shadow-lg bg-white/30 backdrop-filter backdrop-blur-lg border border-white/20 p-7">
        <h2 className="text-2xl font-bold mb-5">Waste Production Overview</h2>

        {wasteData && (
          <div className="w-full">
            <p>Total Waste: {totalWasteCount} kg</p>
            <div className="flex gap-4 mt-4">
              <Button
                onClick={() => handleGraphSelection("bar")}
                gradientDuoTone="purpleToBlue"
              >
                View Bar Chart
              </Button>
              <Button
                onClick={() => handleGraphSelection("pie")}
                gradientDuoTone="cyanToBlue"
              >
                View Pie Chart
              </Button>
            </div>

            <div className="mt-5">
              {chartType === "bar" ? (
                <Bar data={chartData} />
              ) : (
                <Pie data={chartData} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
