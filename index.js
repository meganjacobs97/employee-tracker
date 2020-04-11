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
  inquirer.prompt([
    {
      type:"list",
      choices:["Add a department","Add a role","Add an employee","View all departments","View all roles","View all employees","Update an employee's role","Quit"],
      message:"Please select an option:",
      name:"userChoice"
    }
  ])
  .then(function(answers){
    switch (answers.userChoice) {
      case "Add a department":
        addDepartment(); 
        break; 
      case "Add a role":
        addRole(); 
        break; 
      case "Add an employee":
        addEmployee(); 
        break; 
      case "View all departments":
        viewDepartments(); 
        break; 
      case "View all roles":
        viewRoles(); 
        break; 
      case "View all employees":
        viewEmployees(); 
        break; 
      case "Update an employee's role":
        updateRole(); 
        break; 
      case "quit":
        connection.end();
        break;
      default:
        connection.end();
        break;
    }
  });  
} 

function addDepartment() {
  inquirer.prompt([
    {
      type:"input",
      message:"Enter the name of the department:",
      name:"departmentName"
    }
  ])
  .then(function(answers){ 
    
  })
}

function addRole() {
  inquirer.prompt([
    {
      type:"input",
      message:"Enter the title of the role:",
      name:"roleTitle"
    }, 
    {
      type:"number",
      message:"Enter the salary of the role:",
      name:"roleSalary"
    },
    {
      type:"list",
      choices:getDepartmentNames(), 
      message:"Select the department that this role belongs to:",
      name:"roleDepartment"
    }
  ])
  .then(function(answers){ 
    
  })

}

function addEmployee() {
  inquirer.prompt([
    {
      type:"input",
      message:"Enter the first name of the employee:",
      name:"employeeFirst"
    },
    {
      type:"input",
      message:"Enter the last name of the employee:",
      name:"employeeLast"
    },
    {
      type:"list",
      choices:getRoleNames(), 
      message:"Select the employee's role:",
      name:"employeeRole"
    },
    {
      type:"confirm",
      message:"Does this employee have a manager?",
      default:true, 
      name:"hasManager"
    },
    {
      type:"input",
      message:"Enter the first name of the employee's manager",
      name:"managerFirst",
      when:function(answer){
        return answer.hasManager === true
      }
    },
    {
      type:"input",
      message:"Enter the last name of the employee's manager",
      name:"managerLast",
      when:function(answer){
        return answer.hasManager === true
      }
    }
  ])
  .then(function(answers){ 
    
  })
}


function viewDepartments() {
  const query = "SELECT * FROM department"; 
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    askQuestions(); 
  });
}

function viewRoles() {
  const query = "SELECT * FROM role"; 
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    askQuestions(); 
  });
}

function viewEmployees() {
  const query = "SELECT * FROM employee"; 
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    askQuestions(); 
  });
}

function updateRole() {
  inquirer.prompt([
    {
      type:"input",
      message:"Enter the first name of the employee:",
      name:"employeeFirst"
    },
    {
      type:"input",
      message:"Enter the last name of the employee:",
      name:"employeeLast"
    },
    {
      type:"list",
      choices:getRoleNames(), 
      message:"Select the employee's new role:",
      name:"employeeRole"
    }
  ])
  .then(function(answers){ 
    
  })

}

//returns array of department names 
function getDepartmentNames() {

}

//takes in a department name and returns the id of that department 
function getDepartmentID(departmentName) {

}

//returns array of role names 
function getRoleNames() {

}

//takes in a role name and returns the id of that role 
function getRoleID(roleName) {

}

//takes first and last name of manager and returns manager's id 
function getManagerID(managerFirst,managerLast) {

}

