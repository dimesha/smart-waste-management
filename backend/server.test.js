const request = require("supertest");
const app = require('./server');

describe("AUTH API TEST---------", () => {
    
    // Test Case 01 => Login Success
    it('TEST CASE 01 => Login Success', () => {
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

    // Test Case 02 => Login Failure (Invalid email)
    it('TEST CASE 02 => Login Failure (Invalid email)', () => {
        return request(app)
        .post('/api/user/login')
        .send({
            email: 'invalid@gmail.com',
            password: 'sandy123'
        })
        .expect(400)
        .then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    message: "Invalid email or password",
                    success: false
                })
            );
        });
    });

    // Test Case 03 => Login Failure (Invalid password)
    it('TEST CASE 03 => Login Failure (Invalid password)', () => {
        return request(app)
        .post('/api/user/login')
        .send({
            email: 'sandy@gmail.com',
            password: 'wrongpassword'
        })
        .expect(400)
        .then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    message: "Invalid email or password",
                    success: false
                })
            );
        });
    });

    // Test Case 04 => Registration Success
    // it('TEST CASE 04 => Register a new user successfully', () => {
    //     return request(app)
    //     .post('/api/user/register')
    //     .send({
    //         firstName: 'John',
    //         address: 'New York',
    //         email: 'john@gmail.com',
    //         password: 'john123',
    //         img: 'john_img_url'
    //     })
    //     .expect(200)
    //     .then((res) => {
    //         expect(res.body).toEqual(
    //             expect.objectContaining({
    //                 message: 'User created',
    //                 success: true
    //             })
    //         );
    //     });
    // });

    // Test Case 05 => Registration Failure (Email already exists)
    it('TEST CASE 05 => Registration Failure (Email already exists)', () => {
        return request(app)
        .post('/api/user/register')
        .send({
            firstName: 'Sandy',
            address: 'Colombo',
            email: 'sandy@gmail.com', // Email already exists in database
            password: 'sandy123',
            img: 'sandy_img_url'
        })
        .expect(500)
        .then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    message: 'User not created',
                    success: false
                })
            );
        });
    });

    // Test Case 06 => Get All Users (Success)
    it('TEST CASE 06 => Get all users successfully', () => {
        return request(app)
        .get('/api/user/')
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    message: 'fetch',
                    success: true,
                    data: expect.arrayContaining([
                        expect.objectContaining({
                            _id: expect.any(String),
                            Name: expect.any(String),
                            Email: expect.any(String),
                            Address: expect.any(String)
                        })
                    ])
                })
            );
        });
    });
});