const mysql = require("mysql");
const inquirer = require("inquirer"); 

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "company_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  askQuestions();
});

function askQuestions() {
    //Add departments, roles, employees

    //View departments, roles, employees
  
    //Update employee roles

}