/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Button, Label, TextInput, Checkbox } from "flowbite-react";
import glass from "../assets/categories/glass.jpg";
import metal from "../assets/categories/metal.jpg";
import paper from "../assets/categories/paper.jpg";
import ewaste from "../assets/categories/ewaste.jpg";
import organik from "../assets/categories/organik.jpg";
import plastic from "../assets/categories/plastic.jpg";

// Waste categories data
const wasteCategories = [
  { name: "E-Waste", img: ewaste },
  { name: "Glass Waste", img: glass },
  { name: "Metal Waste", img: metal },
  { name: "Organik Waste", img: organik },
  { name: "Paper Waste", img: paper },
  { name: "Plastic Waste", img: plastic },
];

export default function SchedulePopup({ schedule, isOpen, onClose, onUpdate }) {
  const [updatedSchedule, setUpdatedSchedule] = useState(schedule);

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSchedule((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle changes in waste type selection
  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setUpdatedSchedule((prevData) => {
      const updatedWasteType = checked
        ? [...prevData.wasteType, name]
        : prevData.wasteType.filter((type) => type !== name);
      return { ...prevData, wasteType: updatedWasteType };
    });
  };

  const handleUpdateClick = () => {
    onUpdate(updatedSchedule);
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Update Schedule Details</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          {/* Waste Type Category Selection */}
          <div>
            <Label>Waste Types</Label>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mb-5">
              {wasteCategories.map((category) => (
                <div
                  key={category.name}
                  className="text-center bg-white shadow-lg rounded-2xl py-3"
                >
                  <img
                    src={category.img}
                    alt={category.name}
                    className="h-20 w-auto mx-auto mb-2 "
                  />
                  <Checkbox
                    name={category.name}
                    id={category.name}
                    checked={updatedSchedule.wasteType.includes(category.name)}
                    onChange={handleCategoryChange}
                    className="mr-3"
                  />
                  <Label htmlFor={category.name}>{category.name}</Label>
                </div>
              ))}
            </div>
          </div>
          {/* Date Selection */}
          <div>
            <Label htmlFor="selectedDate">Date</Label>
            <TextInput
              type="date"
              id="selectedDate"
              name="selectedDate"
              className="w-full"
              value={
                new Date(updatedSchedule.selectedDate)
                  .toISOString()
                  .split("T")[0]
              }
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Time Selection */}
          <div>
            <Label htmlFor="selectedTime">Time</Label>
            <TextInput
              type="time"
              id="selectedTime"
              name="selectedTime"
              value={updatedSchedule.selectedTime}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="w-full flex-1">
        <Button
          onClick={handleUpdateClick}
          className="w-full"
          gradientDuoTone="greenToBlue"
        >
          Update
        </Button>
        <Button
          color="gray"
          onClick={onClose}
          className="w-full"
          gradientDuoTone="greenToBlue"
          outline
        >
          Cancle
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
