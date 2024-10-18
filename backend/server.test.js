const request = require("supertest");
const app = require('./server');

describe("AUTH API TEST---------", () => {
    it('TEST CASE 01 => Loging', () => {
        return request(app)
        .post('/api/user/login')
        .send({
            email: 'sandy@gmail.com',
            password: 'sandy123'
        })
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    data: expect.objectContaining({
                        _id: expect.any(String),
                        Name: "sandy",
                        Email: "sandy@gmail.com",
                        Address: "colombo"
                    }),
                    message: "Login successful",
                    success: true,
                    token: expect.any(String)
                })
            );
        });
    });


    //second auth test eka dapan methana
    it('TEST CASE 01 => Loging', () => {
        return request(app)
        .post('/api/user/login')
        .send({
            email: 'sandy@gmail.com',
            password: 'sandy123'
        })
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    data: expect.objectContaining({
                        _id: expect.any(String),
                        Name: "sandy",
                        Email: "sandy@gmail.com",
                        Address: "colombo"
                    }),
                    message: "Login successful",
                    success: true,
                    token: expect.any(String)
                })
            );
        });
    });
});
