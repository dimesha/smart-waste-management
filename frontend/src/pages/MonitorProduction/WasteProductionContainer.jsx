
//we use Container-Presenter Pattern (Component Decomposition)
import React, { useEffect, useState } from 'react';
import WasteProductionView from './WasteProductionView';
import { fetchWasteData } from './ApiService'; // call the fetchWasteData function

const WasteProductionContainer = () => {
  // State to store waste data and other necessary states
  const [userWasteData, setUserWasteData] = useState([]);
  const [chartType, setChartType] = useState('bar');  // Default chart type
  const [activeWasteType, setActiveWasteType] = useState('Organic'); // Filter for waste type
  const [error, setError] = useState('');
  const [highWasteAlert, setHighWasteAlert] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly'); // Time period state

  // Fetch waste data when component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchWasteData();  // Fetching waste data from apiService
        setUserWasteData(data);
        
        const totalWaste = data.reduce((acc, item) => acc + item.wasteAmount, 0);
        if (totalWaste > 100) {
          setHighWasteAlert(true);
        }
      } catch (error) {
        setError('Failed to fetch waste data');
      }
    };

    getData();
  }, []);

  // Function to handle form submission or graph selection
  const handleGraphSelection = (type) => {
    setChartType(type);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission for time period or filtering data
  };

  return (
    <WasteProductionView
      userWasteData={userWasteData}
      chartType={chartType}
      activeWasteType={activeWasteType}
      handleGraphSelection={handleGraphSelection}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={setSelectedPeriod}
      error={error}
      handleSubmit={handleSubmit}
      highWasteAlert={highWasteAlert}
    />
  );
};

export default WasteProductionContainer;
