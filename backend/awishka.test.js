const request = require("supertest");
const app = require('./server'); // Ensure this path correctly points to your Express app

// Mock the middleware to always authenticate and authorize successfully
jest.mock('./util/verifyUser', () => {
    return (req, res, next) => {
        req.user = { userId: '1', isAdmin: true };
        next();
    };
});

// Mocking database models
const WasteModel = require('./models/wasteShedule.model');
jest.mock('./models/wasteShedule.model');

describe("Waste Schedule API Tests", () => {
    // Setup common properties used in the tests
    const testSchedule = {
        wasteType: "Organic",
        address: "123 Test St",
        selectedDate: new Date(),
        selectedTime: "14:00",
        userId: "1"
    };

    beforeEach(() => {
        WasteModel.create.mockResolvedValue(testSchedule);
        WasteModel.find.mockResolvedValue([testSchedule]);
        WasteModel.findById.mockResolvedValue(testSchedule);
        WasteModel.findByIdAndUpdate.mockResolvedValue(testSchedule);
        WasteModel.findByIdAndDelete.mockResolvedValue(testSchedule);
    });

    it('should retrieve all waste schedules successfully', async () => {
        const response = await request(app)
            .get('/api/waste');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Schedules fetched successfully');
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should delete a waste schedule successfully', async () => {
        const response = await request(app)
            .delete('/api/waste/1');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Schedule deleted successfully');
    });

    it('should retrieve a specific waste schedule by ID successfully', async () => {
        // Assuming that WasteModel.findById is already mocked to return a specific schedule
        const scheduleId = "1"; // The ID we're testing retrieval for
        WasteModel.findById.mockResolvedValue({
            _id: scheduleId,
            wasteType: "Organic",
            address: "123 Test St",
            selectedDate: new Date(),
            selectedTime: "14:00",
            userId: "1"
        });
    
        const response = await request(app)
            .get(`/api/waste/${scheduleId}`);
    
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Schedule fetched successfully');
        expect(response.body.data).toHaveProperty('_id', scheduleId);
        expect(response.body.data).toHaveProperty('wasteType', 'Organic');
        expect(response.body.data).toHaveProperty('address', '123 Test St');
        expect(response.body.data).toHaveProperty('userId', '1');
    });
    

    

});
