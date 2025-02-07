const express = require('express');
const app = express();
const port = 3010;

// Middleware to parse JSON requests
app.use(express.json());

// Sample student data
const students = [
    { "student_id": "1", "name": "Alice Johnson", "marks": { "math": 85, "science": 90, "english": 78, "history": 88, "geography": 92 }, "total": 433 },
    { "student_id": "2", "name": "Bob Smith", "marks": { "math": 80, "science": 85, "english": 75, "history": 78, "geography": 92 }, "total": 410 },
    { "student_id": "3", "name": "Charlie Davis", "marks": { "math": 70, "science": 65, "english": 60, "history": 55, "geography": 50 }, "total": 300 }
];

// API Endpoint: Retrieve students above a given threshold
app.post('/students/above-threshold', (req, res) => {
    const { threshold } = req.body;

    // Input validation
    if (typeof threshold !== 'number' || threshold < 0) {
        return res.status(400).json({ error: "Invalid threshold value. It must be a positive number." });
    }

    // Filter students who exceed the threshold
    const filteredStudents = students.filter(student => student.total > threshold);

    res.json({
        count: filteredStudents.length,
        students: filteredStudents.map(student => ({
            name: student.name,
            total: student.total
        }))
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});