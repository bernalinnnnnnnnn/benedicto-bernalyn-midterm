import express from 'express';
import { db } from './db.js';
import cors from 'cors';

const app = express();
app.use(cors());
//parse jason
app.use(express.json());
const PORT = 3000;

//get-lists
app.get('/get-lists', (req, res) => {
    const query = "SELECT * FROM students";
    db.query(query)
        .then(lists => {
            res.status(200).json({ lists: lists.rows })
        });
});

//add students
app.post('/add-students', (req, res) => {
    const { lname, fname, course, year } = req.body;

    const query = "INSERT INTO students (lname, fname, course, year) VALUES ($1,$2,$3,$4)";
    db.query(query, [lname, fname, course, year])
    .then(result => {
        res.status(200).json({ success: true });
    });

});

//delete student
app.post('/delete-student', async (req, res) => {
    try {
        const { student_id } = req.body; 
        
        const deleteListsQuery = "DELETE FROM students WHERE student_id = $1";
        await db.query(deleteListsQuery, [student_id]);

        res.json({ success: true, message: "Student Successfully Deleted." });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});