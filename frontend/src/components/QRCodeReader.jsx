import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const QRCodeReader = () => {
  const navigate = useNavigate();
  const qrRef = useRef(null);
  const [qrData, setQrData] = useState([]);
  const [scannerInitialized, setScannerInitialized] = useState(false);

  const handleNavigate = () => {
    navigate("/qr/generate");
  };

  // Handle QR Code detection
  const onScanSuccess = (decodedText) => {
    console.log(`QR Code detected: ${decodedText}`);

    const parsedData = JSON.parse(decodedText);

    // Show SweetAlert with form to display QR data and allow submission
    Swal.fire({
      title: "QR Code Detected",
      html: `
<form id="qrForm" style="text-align: left;">
      <label style="display: block; margin-bottom: 8px;">Location:</label>
      <input type="text" id="location" value="${parsedData.location}" style="border: none; background: transparent; width: 100%; margin-bottom: 16px;" readonly>
      
      <label style="display: block; margin-bottom: 8px;">Waste Type:</label>
      <input type="text" id="wasteType" value="${parsedData.wasteType}" style="border: none; background: transparent; width: 100%; margin-bottom: 16px;" readonly>
      
      <label style="display: block; margin-bottom: 8px;">Weight (Kg):</label>
      <input type="number" id="weight" value="${parsedData.weight}" style="border: none; background: transparent; width: 100%; margin-bottom: 16px;" readonly>
      
      <label style="display: block; margin-bottom: 8px;">Level (%):</label>
      <input type="number" id="level" value="${parsedData.level}" style="border: none; background: transparent; width: 100%; margin-bottom: 16px;" readonly>
      
      <label style="display: block; margin-bottom: 8px;">Owner:</label>
      <input type="text" id="owner" value="${parsedData.owner}" style="border: none; background: transparent; width: 100%;" readonly>
    </form>
      `,
      showCancelButton: true,
      confirmButtonText: "Collected",
      confirmButtonColor: "#006400",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        return {
          location: document.getElementById("location").value,
          wasteType: document.getElementById("wasteType").value,
          weight: document.getElementById("weight").value,
          level: document.getElementById("level").value,
          owner: document.getElementById("owner").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        sendDataToBackend(result.value);
      }
    });
  };

  const onScanError = (error) => {
    console.error(`QR Scan Error: ${error}`);
  };

  const sendDataToBackend = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const requestData = {
        location: data.location,
        wasteType: data.wasteType,
        weight: data.weight,
        level: data.level,
        owner: data.owner,
      };

      const res = await fetch("http://localhost:5001/api/qr/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      const response = await res.json();

      if (response.status === "success") {
        Swal.fire({
          title: "Success!",
          text: response.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#006400",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to send data to backend",
          confirmButtonText: "OK",
          confirmButtonColor: "#006400",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to send data to backend",
        confirmButtonText: "OK",
        confirmButtonColor: "#006400",
      });
    }
  };

  const fetchQrData = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch("http://localhost:5001/api/qr", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      const result = await response.json();
      if (result.status === "success") {
        setQrData(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch QR data", error);
    }
  };

  useEffect(() => {
    fetchQrData();
    const config = { fps: 10, qrbox: 250 };
    const qrScanner = new Html5QrcodeScanner("qr-reader", config, false);

    qrScanner.render((decodedText) => {
      onScanSuccess(decodedText);
      setScannerInitialized(true);
    }, onScanError);

    return () => {
      qrScanner.clear();
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen  p-5">
      {/* Left Side - QR Code Scanner */}
      <div className="bg-white bg-opacity-40 backdrop-blur-md rounded-lg shadow-lg p-6 w-full md:w-1/2 mb-5 md:mb-0 md:mr-5 ">
        <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Scan QR Code
        </h3>

        <div
          id="qr-reader"
          ref={qrRef}
          className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center align-middle justify-center bg-white"
          style={{ width: "100%", height: "250px" }}
        >
          {/* Show fallback image when scanner is not active */}
          {!scannerInitialized && (
            <img
              src="your-image-url-here"
              alt="QR Scanner Fallback"
              className="w-10 h-10 object-contain"
            />
          )}
        </div>

        <p className="text-center text-gray-600 mt-4">
          Point your camera at a QR code to scan.
        </p>
        <Button
          type="submit"
          className="w-full mt-6"
          gradientDuoTone="greenToBlue"
          onClick={handleNavigate}
        >
          Generate QR Code
        </Button>
      </div>
      {/* Right Side - QR Code Data */}
      <div className="bg-white bg-opacity-40 rounded-lg shadow-lg p-6 w-full md:w-1/2 overflow-auto h-auto md:max-h-screen">
        <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
          QR Code Details
        </h3>
        {qrData.length > 0 ? (
          qrData.map((item) => (
            <div
              key={item._id}
              className="bg-white hover:bg-green-100 p-4 mb-4 rounded-lg shadow-md"
            >
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Waste Type:</strong> {item.wasteType}
              </p>
              <p>
                <strong>Weight:</strong> {item.weight} kg
              </p>
              <p>
                <strong>Level:</strong> {item.level}%
              </p>
              <p>
                <strong>Owner:</strong> {item.owner}
              </p>
              <p>
                <strong>Collector:</strong> {item.collector}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No QR data available</p>
        )}
      </div>
    </div>
  );
};

export default QRCodeReader;
