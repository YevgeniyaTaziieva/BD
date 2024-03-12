import { test, expect } from '@playwright/test';
import axios, { AxiosResponse } from 'axios';
import mysql from 'mysql';

const BASE_URL = 'http://localhost:3306/';
const userData = {
    username: 'Yevheniia',
    email: 'user6@gmail.com',
    password: 'Test123',
};

let connection;

test.beforeAll(() => {
    connection = mysql.createConnection({
        host: 'yh6.h.filess.io',
        user: 'automation_heraction',
        password: 'a15e5a47817c45a99ca9f32298e1cca90ea3c056',
        database: 'automation_heraction',
        port: 3306,
    });
});

test('Check user count in the database', async () => {
    const results = await new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users_taziieva', function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
                expect(results.length).toEqual(5);
            }
        });
    });
    console.log(results);
});

test('Create a new user and verify it', async ({ request }) => {
    const results = await new Promise(async (resolve, reject) => {
        connection.query(
            `INSERT INTO users_taziieva (username, email, password) VALUES ('${userData.username}', '${userData.email}', '${userData.password}')`,
            async function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                    const response: AxiosResponse = await axios.post(`${BASE_URL}/user`, userData);
                    expect(response.status).toBe(200);
                    const text = await response.data;
                    expect(text).toContain('Yevheniia');
                    console.log(response.data);
                }
            }
        );
    });
    console.log(results);
});

test('DELETE user and verify it', async () => {
    const results = new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM users_taziieva WHERE username='${userData.username}'`,
            function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
  
        let data = request.get(`${BASE_URL}/user/${userData.username}`);
        let parsed = data.json();
        console.log(parsed)
        expect(parsed).toEqual([])

        console.log(results);
    });

})

test.afterAll(() => {
    connection.end();
});

