import React from 'react';

const ReportTable = ({ wasteData, owner, location }) => {
  return (
    <div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-green-600">Collector</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-green-600">Pickup Date</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-green-600">Waste Type</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-green-600">Weight (Kg)</th>
          </tr>
        </thead>
        <tbody>
          {wasteData
            .filter(waste => waste.owner === owner && waste.location === location) // Filter using props
            .map((detail, idx) => (
              <tr key={idx} className="hover:bg-green-50 transition-colors">
                <td className="py-2 px-4 border-b border-gray-300">{detail.collector}</td>
                <td className="py-2 px-4 border-b border-gray-300">{new Date(detail.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b border-gray-300">{detail.wasteType}</td>
                <td className="py-2 px-4 border-b border-gray-300">{detail.weight} Kg</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
