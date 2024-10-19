import { useState, useEffect } from "react";
import { Checkbox, Button, Card, Label, TextInput } from "flowbite-react";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import Swal from "sweetalert2";
import background from "../assets/background.png";
import glass from "../assets/categories/glass.jpg";
import metal from "../assets/categories/metal.jpg";
import paper from "../assets/categories/paper.jpg";
import ewaste from "../assets/categories/ewaste.jpg";
import organik from "../assets/categories/organik.jpg";
import plastic from "../assets/categories/plastic.jpg";
import SchedulePopup from "../components/SchedulePopup";

// **Component-Based Architecture Design Pattern**: By separating the waste category data from the main component,
// we're promoting reusability and modularity. This is a basic use of the component-based design pattern.
const wasteCategories = [
  { name: "E-Waste", img: ewaste },
  { name: "Glass Waste", img: glass },
  { name: "Metal Waste", img: metal },
  { name: "Organik Waste", img: organik },
  { name: "Paper Waste", img: paper },
  { name: "Plastic Waste", img: plastic },
];

export default function ScheduleCollection() {
  // **State Management** (Hooks Design Pattern):
  // Using useState to manage form data, pickup history, selected schedule, and modal state.
  // This isolates state logic in a predictable way, which is a principle of React hooks.
  const [formData, setFormData] = useState({
    wasteType: [],
    selectedDate: "",
    selectedTime: "",
  });
  const [pickupHistory, setPickupHistory] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // **Effect Hook** (Separation of Concerns):
  // Fetching data from the API in useEffect separates the concern of data fetching from rendering the UI.
  // This allows for better readability, testability, and maintainability of code.
  useEffect(() => {
    const fetchPickupHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("/api/waste", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.status === "success") {
          setPickupHistory(data.data);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchPickupHistory();
  }, []);

  // **Event Handlers** (Encapsulation):
  // The `handleChange` function encapsulates the logic of updating the form state,
  // separating concerns by isolating this logic in its own function.
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => {
      const updatedWasteType = checked
        ? [...prevData.wasteType, name]
        : prevData.wasteType.filter((type) => type !== name);
      return { ...prevData, wasteType: updatedWasteType };
    });
  };

  // **Handle Submit (Command Design Pattern)**:
  // This function sends a request to the server, effectively representing a "command" to create a schedule.
  // The command design pattern is implemented here as the system executes a specific task (scheduling a pickup).
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/waste", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.status === "success") {
        setPickupHistory((prevHistory) => [...prevHistory, data.data]);
        Swal.fire({
          title: "Success!",
          text: "Your waste collection has been successfully scheduled.",
          confirmButtonText: "OK",
          confirmButtonColor: "#006400",
        });
      } else if (data.status === "failed") {
        Swal.fire({
          title: "Error!",
          text: data.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#FF0000",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an issue submitting your schedule.",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF0000",
      });
    }
  };

  // **Handle Card Click (Command Pattern)**:
  // Fetching and displaying schedule details upon card click. Similar to the command pattern,
  // where an action is triggered to retrieve a specific schedule.
  const handleCardClick = async (scheduleId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/waste/${scheduleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status === "success") {
        setSelectedSchedule(data.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  // **Handle Update (Command Pattern)**:
  // This function updates an existing schedule, acting like a "command" sent to the server to perform a specific action.
  const handleUpdate = async (updatedSchedule) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/waste/${updatedSchedule._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedSchedule),
      });

      const data = await res.json();
      if (data.status === "success") {
        const updatedHistory = pickupHistory.map((item) =>
          item._id === updatedSchedule._id ? data.data : item
        );
        setPickupHistory(updatedHistory);
        setIsModalOpen(false);
        Swal.fire({
          title: "Updated!",
          text: "Your schedule has been updated.",
          confirmButtonText: "OK",
          confirmButtonColor: "#006400",
        });
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  // **Handle Delete (Command Pattern)**:
  // Similar to the Command Pattern, this method triggers the delete action and modifies the schedule list accordingly.
  const handleDelete = async (scheduleId) => {
    const token = localStorage.getItem("token");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#FF0000",
      cancelButtonColor: "#006400",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/waste/${scheduleId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();

          if (data.status === "success") {
            setPickupHistory(
              pickupHistory.filter((item) => item._id !== scheduleId)
            );
            Swal.fire({
              title: "Deleted!",
              text: "Your schedule has been deleted.",
              confirmButtonText: "OK",
              confirmButtonColor: "#006400",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting your schedule. Please try again.",
            confirmButtonText: "OK",
            confirmButtonColor: "#006400",
          });
        }
      }
    });
  };

  return (
    <div
      className="flex lg:flex-row flex-col justify-between gap-8 p-8 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* Left Side - Waste Category Selection */}
      {/* Encapsulation of form rendering and waste type logic in a separate form container */}
      <div className="w-full lg:w-1/2 flex flex-col items-center glassmorphism rounded-lg shadow-lg bg-white/30 backdrop-filter backdrop-blur-lg border border-white/20 p-7 lg:h-2/3 ">
        <h2 className="text-2xl font-bold mb-5">Schedule Waste Collection</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid lg:grid-cols-3  md:grid-cols-2 gap-4 mb-5">
            {wasteCategories.map((category) => (
              <div
                key={category.name}
                className="text-center bg-white shadow-lg rounded-2xl py-3"
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="h-20 w-auto mx-auto mb-2"
                />
                <Checkbox
                  name={category.name}
                  id={category.name}
                  onChange={handleChange}
                  className="mr-3"
                />
                <Label htmlFor={category.name}>{category.name}</Label>
              </div>
            ))}
          </div>

          <div className="md:flex gap-8">
            <div className="mb-5 flex-1">
              <Label htmlFor="selectedDate">Select Date:</Label>
              <TextInput
                type="date"
                id="selectedDate"
                value={formData.selectedDate}
                onChange={(e) =>
                  setFormData({ ...formData, selectedDate: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>

            <div className="mb-5 flex-1">
              <Label htmlFor="selectedTime">Select Time:</Label>
              <TextInput
                type="time"
                id="selectedTime"
                value={formData.selectedTime}
                onChange={(e) =>
                  setFormData({ ...formData, selectedTime: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            gradientDuoTone="greenToBlue"
          >
            Schedule Pickup
          </Button>
        </form>
      </div>

      {/* Right Side - Pickup History */}
      {/* Separation of Concerns: Pickup history and associated logic are separated into its own section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:h-2/3 bg-white shadow-lg rounded-lg p-7 glassmorphism border border-white/30">
        <h2 className="text-2xl font-bold mb-5">Pickup History</h2>

        <div className="flex flex-col gap-4 w-full">
          {pickupHistory.length ? (
            pickupHistory.map((schedule) => (
              <Card
                key={schedule._id}
                className="flex justify-between hover:bg-green-100"
              >
                <div onClick={() => handleCardClick(schedule._id)}>
                  <h2 className="text-2xl font-bold mb-5">
                    Job Status: <span style={{ color: "red" }}>Pending</span>
                  </h2>
                  <p>
                    <strong>Waste Types:</strong>{" "}
                    {schedule.wasteType.join(", ")}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(schedule.selectedDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {schedule.selectedTime}
                  </p>
                </div>
                <div className="flex justify-end gap-2 w-full">
                  <HiPencilAlt
                    className="text-blue-500 cursor-pointer"
                    size={24}
                    onClick={() => handleCardClick(schedule._id)}
                  />
                  <HiTrash
                    className="text-red-500 cursor-pointer"
                    size={24}
                    onClick={() => handleDelete(schedule._id)}
                  />
                </div>
              </Card>
            ))
          ) : (
            <p>No pickup history available.</p>
          )}
        </div>
      </div>

      {/* Modal for updating schedule */}
      {isModalOpen && (
        <SchedulePopup
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          schedule={selectedSchedule}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
