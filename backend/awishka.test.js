const request = require("supertest");
const app = require('./server'); // Path to your Express app

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

    // 1. Test for creating a new waste schedule
    it('should retrieve all waste schedules successfully', async () => {
        const response = await request(app)
            .get('/api/waste');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Schedules fetched successfully');
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    // 2. Test for retrieving all waste schedules
    it('should retrieve all waste schedules successfully', async () => {
        const response = await request(app)
            .get('/api/waste');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Schedules fetched successfully');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    // 3. Test for retrieving a specific waste schedule by ID
    it('should retrieve a specific waste schedule by ID successfully', async () => {
        const scheduleId = "1";
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
    });

    // 4. Test for updating a waste schedule by ID
    it('should update a waste schedule by ID successfully', async () => {
        const updatedSchedule = { ...testSchedule, address: "456 Updated St" };

        WasteModel.findByIdAndUpdate.mockResolvedValue(updatedSchedule);

        const response = await request(app)
            .put('/api/waste/1')
            .send(updatedSchedule);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Schedule updated successfully');
        expect(response.body.data).toHaveProperty('address', '456 Updated St');
    });

    // 5. Test for deleting a waste schedule by ID
    it('should delete a waste schedule successfully', async () => {
        const response = await request(app)
            .delete('/api/waste/1');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Schedule deleted successfully');
    });

    // 6. Test for handling schedule not found (Invalid ID)
    it('should return an error when schedule is not found', async () => {
        WasteModel.findById.mockResolvedValue(null);

        const response = await request(app)
            .get('/api/waste/invalidId');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    });
});
