const request = require("supertest");
const app = require('./server'); // Make sure this points to your express app

// Mock the JWT middleware to always authenticate
jest.mock('./util/verifyUser', () => (req, res, next) => {
    req.user = { id: '1', isAdmin: true }; // Mocked user object
    next();
});

describe("QR Code API Tests", () => {
    // Passing Test Cases
    it('Create QR Code - Success', () => {
        return request(app)
        .post('/api/qr')
        .send({
            location: "New Location",
            wasteType: "Organic",
            weight: 120,
            level: 5,
            owner: "sandy"
        })
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    status: 'success',
                    message: 'QR code and message created successfully',
                    qrData: expect.any(Object),
                    messageData: expect.any(Object)
                })
            );
        });
    });

    it('Get QR Code - Success', () => {
        return request(app)
        .get('/api/qr')
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    status: 'success',
                    message: 'QR code retrieved successfully',
                    data: expect.any(Array)
                })
            );
        });
    });

    it('Get QR Code by Type - Success', () => {
        return request(app)
        .get('/api/qr/type/Organic')
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    status: 'success',
                    message: 'QR codes retrieved successfully',
                    data: expect.any(Array)
                })
            );
        });
    });

    // Failing Test Cases
    it('Create QR Code - Unauthorized', () => {
        jest.resetModules(); // Reset the mock to simulate unauthorized access
        return request(app)
        .post('/api/qr')
        .send({
            location: "New Location",
            wasteType: "Organic",
            weight: 120,
            level: 5,
            owner: "sandy"
        })
        .expect(401)
        .then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    status: 'failed',
                    message: 'You are not authorized to perform this action'
                })
            );
        });
    });

    it('Get QR Code - No QR Found', () => {
        return request(app)
        .get('/api/qr')
        .expect(404)
        .then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    status: 'failed',
                    message: 'QR code not found'
                })
            );
        });
    });

    it('Get QR Code by Type - No QR Found', () => {
        return request(app)
        .get('/api/qr/type/Inorganic')
        .expect(404)
        .then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    status: 'failed',
                    message: 'No QR codes found for the given waste type'
                })
            );
        });
    });
});
