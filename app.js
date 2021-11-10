const mysql = require("mysql2");
const express = require("express");
const { Router } = require("express");
var app = express();
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "K@vya@123",
  database: "students",
  multipleStatements: true,
});
mysqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log("express server is running"));

app.get("/student", (req, res) => {
    mysqlConnection.query(
      "select * from student;",
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });

  

  app.get("/course", (req, res) => {
    mysqlConnection.query(
      "select * from course;",
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });

  app.get('/course/:id' , (req, res) => {
    mysqlConnection.query('SELECT * from course WHERE course_id = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

  app.get("/exams", (req, res) => {
    mysqlConnection.query(
      "select * from exams;",
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });

app.get("/studentcourse", (req, res) => {
  mysqlConnection.query("select student.studentid,student.firstname,student.lastname,course.courseid,course.coursename from student join course on student.studentid=course.studentid",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

app.get("/studentexam", (req, res) => {
    mysqlConnection.query ("select student.studentid,student.firstname,student.lastname,exams.examid,exams.examname from student join exams on student.studentid=exams.studentid",
     (err,rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });

    app.post("/update", (req, res) => {
    mysqlConnection.query(
        "insert into student(studentid,firstname) values('114','kavya');",
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });