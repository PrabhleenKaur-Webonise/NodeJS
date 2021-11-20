const mysql = require("mysql");
const express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newEra2019_",
  database: "employeeDB",
});

mysqlConnection.connect((err) => {
  if (!err) console.log("DB connection success");
  else
    console.log(
      "DB connection fail /n Error: " + JSON.stringify(err, undefined, 2)
    );
});

app.listen(3000, () => console.log("Express server is running"));

//get all employees
app.get("/employees", (req, res) => {
  mysqlConnection.query("SELECT * FROM employee", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//get one employee
app.get("/employees/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM employee WHERE EmpID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//delete one employee
app.delete("/employees/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM employee WHERE EmpID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully");
      else console.log(err);
    }
  );
});

//add one employee
app.post("/employees", (req, res) => {
  let { EmpID, Name, Salary, EmpCode } = req.body;

  mysqlConnection.query(
    "INSERT INTO employee VALUES ( ?, ?, ? ,?);",
    [EmpID, Name, EmpCode, Salary],
    (err, rows) => {
      if (!err) {
        res.send("Employee successfully added");
      } else {
        console.log(err);
      }
    }
  );
});

//edit one employee
app.put("/employees/:id", (req, res) => {
  let { Name, Salary, EmpCode } = req.body;
  let EmpID = req.params.id;

  mysqlConnection.query(
    "UPDATE employee SET Name=?, EmpCode=?, Salary=? WHERE EmpID = ?;",
    [Name, EmpCode, Salary, EmpID],
    (err, rows) => {
      if (!err) {
        res.send("Employee updated sucessfully");
      } else {
        console.log(err);
      }
    }
  );
});
