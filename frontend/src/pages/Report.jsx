import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainWasteChart from '../components/MainWasteChart';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReportTable from '../components/ReportTable';

const Report = () => {
  const [wasteData, setWasteData] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null); // Track selected owner
  const [expandedRows, setExpandedRows] = useState([]); // Track which rows are expanded

  useEffect(() => {
    // Fetch waste data from the backend API
    const fetchWasteData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/qr/get-all-waste');
        console.log('Fetched data:', response.data); // Debug to check fetched data
        setWasteData(response.data);
      } catch (error) {
        console.error('Error fetching waste data:', error);
      }
    };

    fetchWasteData();
  }, []);

  // Prepare the data for the bar chart by grouping by wasteType and summing the weights
  const chartData = wasteData
    .filter(item => selectedOwner ? item.owner === selectedOwner : true) // Filter by selected owner
    .reduce((acc, curr) => {
      const existingEntry = acc.find(item => item.wasteType === curr.wasteType);
      if (existingEntry) {
        existingEntry.weight += curr.weight;
      } else {
        acc.push({ wasteType: curr.wasteType, weight: curr.weight });
      }
      return acc;
    }, []);

  // Prepare the table data by grouping by owner and location, and summing the weights
  const tableData = wasteData.reduce((acc, curr) => {
    const existingEntry = acc.find(item => item.owner === curr.owner && item.location === curr.location);
    if (existingEntry) {
      existingEntry.weight += curr.weight;
    } else {
      acc.push({ owner: curr.owner, location: curr.location, weight: curr.weight });
    }
    return acc;
  }, []);

  // Toggle expanded row when "View" is clicked
  const toggleRow = (owner) => {
    if (expandedRows.includes(owner)) {
      setExpandedRows(expandedRows.filter(row => row !== owner)); // Collapse row
      setSelectedOwner(null); // Reset the selected owner to show all data
    } else {
      setExpandedRows([...expandedRows, owner]); // Expand row
      setSelectedOwner(owner); // Update the chart by owner
    }
  };

  // Function to download history data as PDF
  const downloadPDF = (owner, location) => {
    const filteredData = wasteData.filter(waste => waste.owner === owner && waste.location === location);

    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Set document title and owner name
    doc.setFontSize(18);
    doc.text(`${owner} Waste History Report`, 14, 22);

    // Prepare table data
    const tableColumns = ['Owner', 'Location', 'Collector', 'Pickup Date', 'Waste Type', "Weight (KG)"];
    const tableRows = filteredData.map(detail => [
      detail.owner,
      detail.location,
      detail.collector,
      new Date(detail.createdAt).toLocaleDateString(),
      detail.wasteType,
      detail.weight
    ]);

    // Add table to the PDF using autoTable
    doc.autoTable({
      startY: 30,
      head: [tableColumns],
      body: tableRows,
    });

    // Save the PDF
    doc.save(`${owner}_waste_history.pdf`);
  };

  return (
    <div>
      {/* Bar chart displaying waste type and weight */}
      <div className="flex justify-center mb-10">
        <MainWasteChart data={chartData} />
      </div>

      {/* Table displaying categorized data by owner and location */}
      <div className='px-20'>
        <div className="flex justify-center"> {/* Center the table */}
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="p-3 border border-green-600">Owner</th>
                <th className="p-3 border border-green-600">Location</th>
                <th className="p-3 border border-green-600">Total Weight</th>
                <th className="p-3 border border-green-600">View</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <React.Fragment key={index}>
                  <tr className={`bg-green-100 ${index % 2 === 0 ? 'bg-green-50' : 'bg-green-100'}`}>
                    <td className="p-3 border border-green-300">{item.owner}</td>
                    <td className="p-3 border border-green-300">{item.location}</td>
                    <td className="p-3 border border-green-300">{item.weight} kg</td>
                    <td className="p-3 border border-green-300">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                        onClick={() => toggleRow(item.owner)}>
                        {expandedRows.includes(item.owner) ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>
                  {expandedRows.includes(item.owner) && (
                    <tr className="bg-green-200">
                      <td colSpan="4" className="p-3 border border-green-300">
                        {/* Display collector and createdAt in the dropdown */}
                        <div className="bg-green-100 p-4 rounded-lg shadow-md">
                          <h4 className="text-green-700 font-semibold mb-2">Details:</h4>
                          <ReportTable wasteData={wasteData} owner={item.owner} location={item.location} /> {/* Pass props */}
                          <button
                            onClick={() => downloadPDF(item.owner, item.location)} // Pass parameters
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                            Download History
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
