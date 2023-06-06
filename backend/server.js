// //01. import express module
// const express = require('express');
// // 04.
// const cors = require('cors');
// const mysql = require('mysql');

// // 02. Assign new express app instance to app varibale
// // Represent express applications
// // Used to define routes, middelware and handle HTTP requests and responses
// const app = express();
// app.use(cors());

// // 05.
// const db = mysql.createConnection({
//     user:"root",
//     host:"localhost",
//     password:'',
//     database:'full_crud_system'
// })

// // 03. Calls listen method to start server and make it listen to port 8000
// // Arguments : port number, optional callback function
// app.listen(8000, ()=>{
//     console.log("Listening to port 8000");
// })

// // Enable CORS for the specified origin (http://localhost:3000)
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200
// };

// // Now server is ready to accept incoming HTTP requests and respond accordingly
// // 06.
// app.get("/", cors(corsOptions), (req, res) => {
//     const sql = "SELECT * FROM students";
//     db.query(sql, (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });
// // app.post('/create', (req,res)=>{

// // })

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: '',
    database: 'full_crud_system'
});

app.listen(8000, () => {
    console.log("Listening to port 8000");
});

// Get all students
app.get("/", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json("Error");
      }
      res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
      return res.json(data);
    });
  });

  app.get("/getStudentsById/:id", (req, res) => {
    const studentId = req.params.id;
    const sql = "SELECT * FROM students WHERE idstudents = ?";
    db.query(sql, [studentId], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.json(data);
    });
  });
  

//   Create a new student
app.post("/create", (req,res)=>{
    const sql = "INSERT INTO students (`name`, `email`) VALUES (?)";
    const values = [req.body.name, req.body.email];
    db.query(sql, [values], (err,data)=>{
        if(err) {return res.json("Error");}
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        return res.json(data);
    })
})

//Edit a student
app.put("/update/:id", (req, res) => {
    const sql = "UPDATE students SET name = ?, email = ? WHERE idstudents = ?";
    const values = [req.body.name, req.body.email, req.params.id];
  
    db.query(sql, values, (err, data) => {
      if (err) {
        return res.json("Error");
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.json(data);
    });
  });
  
// delete by id 
app.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM students WHERE idstudents = ?";
    const id = req.params.id;
  
    db.query(sql, [id], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.json(data);
    });
  });
  

app.use(
    cors({
      origin: "*", // <-- allow all origins
      credentials: true,
    })
  );