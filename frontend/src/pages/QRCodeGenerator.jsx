import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import background from "../assets/background.png";

const QRCodeGenerator = () => {
  const [formData, setFormData] = useState({
    location: "",
    wasteType: "",
    weight: "",
    level: "",
    owner: "",
  });
  const [qrValue, setQrValue] = useState(null);
  const [generatedQrData, setGeneratedQrData] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); 
      const res = await fetch("http://localhost:5001/api/qr/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status === "success") {
        setGeneratedQrData(data.qrData);
        setQrValue(JSON.stringify(data.qrData)); 
      } else {
        console.error("Failed to generate QR code:", data.message);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div
      className="flex lg:flex-row flex-col justify-between gap-8 p-8 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Generate QR Code
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 font-medium"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium"
              htmlFor="wasteType"
            >
              Waste Type
            </label>
            <input
              type="text"
              id="wasteType"
              name="wasteType"
              value={formData.wasteType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium" htmlFor="weight">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium" htmlFor="level">
              Level (%)
            </label>
            <input
              type="number"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium" htmlFor="owner">
              Owner
            </label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Generate QR Code
          </button>
        </form>

        {/* Display QR Code if generated */}
        {qrValue && (
          <div className="mt-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Your QR Code:
            </h3>
            <QRCodeCanvas value={qrValue} size={200} />{" "}
            {/* Updated component */}
            {/* Optional: Show generated QR data */}
            {generatedQrData && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                <p>
                  <strong>Location:</strong> {generatedQrData.location}
                </p>
                <p>
                  <strong>Waste Type:</strong> {generatedQrData.wasteType}
                </p>
                <p>
                  <strong>Weight:</strong> {generatedQrData.weight} kg
                </p>
                <p>
                  <strong>Level:</strong> {generatedQrData.level}%
                </p>
                <p>
                  <strong>Owner:</strong> {generatedQrData.owner}
                </p>
                <p>
                  <strong>Collector:</strong> {generatedQrData.collector}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
