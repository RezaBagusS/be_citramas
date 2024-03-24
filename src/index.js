const prisma = require('./libs/prisma');
const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.get('/api/v1/test', (req, res) => {
    res.send('Hello World');
});

app.get('/api/v1/activity', async (req, res) => {
    const activities = await prisma.activity.findMany();
    res.send({
        error: false,
        data: activities
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});