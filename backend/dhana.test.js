const request = require("supertest");
const app = require('./server'); // Make sure this correctly points to your initialized and configured Express app

// Mock the JWT middleware to always authenticate for success test cases
jest.mock('./util/verifyUser', () => {
    return (req, res, next) => {
        req.user = { id: '1', isAdmin: true }; // Admin privileges for successful authentication
        next();
    };
});

// Mocking your database model methods to simulate database interactions
const QRModel = require('./models/qrScanner.model');
jest.mock('./models/qrScanner.model');

describe("QR Code API Tests", () => {
    beforeEach(() => {
        // Setup the QRModel mock for each test to avoid state leakage
        QRModel.find.mockResolvedValue([]);
        QRModel.create.mockResolvedValue({
            location: "New Location",
            wasteType: "Organic",
            weight: 120,
            level: 5,
            owner: "Avishka"
        });
    });

    // Passing Test Cases
    it('Create QR Code Failed - Failed', async () => {
        const response = await request(app)
            .post('/api/qr')
            .send({
                location: "New Location",
                wasteType: "Organic",
                weight: 120,
                level: 5,
                owner: "Avishka"
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual(expect.objectContaining({
            status: 'failed',
            message: 'User not found',
        }));
    });

    it('Get QR Code - Success', async () => {
        QRModel.find.mockResolvedValue([{ id: 1, location: "New Location" }]);
        const response = await request(app)
            .get('/api/qr');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            status: 'success',
            message: 'QR code retrieved successfully',
            data: expect.any(Array)
        }));
    });

    it('Get QR Code by Type - Success', async () => {
        QRModel.find.mockResolvedValue([{ id: 1, location: "New Location", wasteType: "Organic" }]);
        const response = await request(app)
            .get('/api/qr/type/Organic');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            status: 'success',
            message: 'QR codes retrieved successfully',
            data: expect.any(Array)
        }));
    });

    // Failing Test Cases (Adjust the mock setup to simulate failures)
    it('Create QR Code - Unauthorized', async () => {
        // Override the mock for this test to simulate unauthorized access
        jest.doMock('./util/verifyUser', () => {
            return (req, res, next) => {
                res.status(404).json({ status: 'failed', message: 'You are not authorized to perform this action' });
            };
        });

        const response = await request(app)
            .post('/api/qr')
            .send({
                location: "New Location",
                wasteType: "Organic",
                weight: 120,
                level: 5,
                owner: "sandy"
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual(expect.objectContaining({
            status: 'failed',
            message: 'User not found'
        }));
    });

    it('Get QR Code - No QR Found', async () => {
        QRModel.find.mockResolvedValue([]); // Ensure the mock returns an empty array
        const response = await request(app)
            .get('/api/qr');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            status: 'success',
            message: 'QR code retrieved successfully'
        }));
    });

    it('Get QR Code by Type - success', async () => {
        QRModel.find.mockResolvedValue([]); // Ensure the mock returns an empty array for this type
        const response = await request(app)
            .get('/api/qr/type/Inorganic');

        expect(response.status).toBe(404);
        expect(response.body).toEqual(expect.objectContaining({
            status: 'failed',
            message: 'No QR codes found for the given waste type'
        }));
    });
});

