// WasteProduction.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'; // for DOM assertions
import axios from "axios";
import WasteProduction from "../../pages/WasteProduction"; // Adjust the path as necessary

// Mock axios
jest.mock("axios");

describe("WasteProduction Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { owner: "John Doe", wasteType: "Organic", weight: 50, location: "Location A", createdAt: "2024-10-01" },
        { owner: "John Doe", wasteType: "Dry", weight: 30, location: "Location B", createdAt: "2024-10-02" },
        { owner: "John Doe", wasteType: "Wet", weight: 20, location: "Location C", createdAt: "2024-10-03" },
      ],
    });

    // Mock localStorage for user data
    const user = { Name: "John Doe" };
    window.localStorage.setItem("token", "mockToken");
    window.localStorage.setItem("user", JSON.stringify(user));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component correctly", async () => {
    render(<WasteProduction />);

    // Check if the title is rendered
    expect(screen.getByText(/Monitor Waste Production/i)).toBeInTheDocument();

    // Check if the "Check My Waste Levels" button is rendered
    const checkButton = screen.getByText(/Check My Waste Levels/i);
    expect(checkButton).toBeInTheDocument();

    // Simulate clicking the button
    fireEvent.click(checkButton);

    // Wait for the waste data to be fetched and displayed
    await waitFor(() =>
      expect(screen.getByText(/Total Waste: 100 kg/i)).toBeInTheDocument()
    );
  });

  test("shows the alert when high waste levels are detected", async () => {
    render(<WasteProduction />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Simulate the fetched data causing the high waste alert to trigger
    const alert = await screen.findByText(/Your waste production levels are high/i);
    expect(alert).toBeInTheDocument();
  });

  test("renders the correct waste breakdown after selection", async () => {
    render(<WasteProduction />);

    // Wait for the data to be fetched
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Select Organic Waste
    const organicButton = screen.getByText(/Organic Waste/i);
    fireEvent.click(organicButton);

    // Check if Organic Waste section is displayed
    expect(screen.getByText(/Total Organic Waste: 50 kg/i)).toBeInTheDocument();
  });

  test("displays error when no date period is selected", async () => {
    render(<WasteProduction />);

    // Submit the form without selecting a period
    const submitButton = screen.getByText(/Retrieve Data/i);
    fireEvent.click(submitButton);

    // Expect an error message to be shown
    expect(screen.getByText(/Invalid time-period selected/i)).toBeInTheDocument();
  });
});
