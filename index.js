//dependencies 
const mysql = require("mysql");
const inquirer = require("inquirer"); 

//set up connection to databae 
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

//connect to database 
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  askQuestions(); 
});

//ask user what they want to do 
function askQuestions() {
  //CURRENT FUNCTIONALITY:
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
    //call functions based on user choice 
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

//adds a department to the department table 
function addDepartment() {
  //prompt for department name
  inquirer.prompt([
    {
      type:"input",
      message:"Enter the name of the department:",
      name:"departmentName"
    }
  ])
  .then(function(answers){ 
    const query ="INSERT INTO department SET ?"; 
    //run query to add department 
    connection.query(query, {name: answers.departmentName},function(err,res) {
      if(err) throw err; 
      //show success message
      console.log(`\n${answers.departmentName} Department successfully added\n`); 
      //run initial prompt
      askQuestions(); 
    }); 
  })
}

//adds a role to the role table 
function addRole() {
  //first need to get the department names in order to execute inquirer prompt 
  let departmentNames = []; 
  const query = "SELECT name FROM department"; 
  connection.query(query, function (err, res) {
    if (err) throw err;
    for(let i = 0; i < res.length; i++) {
      departmentNames.push(res[i].name); 
    }
    //now that we have the department names, run the prompt
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
        choices:departmentNames, 
        message:"Select the department that this role belongs to:",
        name:"roleDepartment"
      }
    ])
    .then(function(answers){ 

      //get department ID from department name provided by user so that it can be added to table entry 
      let departmentID = null; 
      const idQuery = "SELECT id FROM department WHERE ?"; 
      connection.query(idQuery, {name:answers.roleDepartment}, function (idErr, idRes) {
        if (idErr) throw idErr;
        departmentID = idRes[0].id; 

        //build query 
        const addQuery ="INSERT INTO role SET ?"; 
        //run query to add role
        connection.query(addQuery, 
        {
          title: answers.roleTitle,
          salary: answers.roleSalary,
          department_id: departmentID
        },
        function(err,res) {
          if(err) throw err; 
          //show success message
          console.log(`\n${answers.roleTitle} Role successfully added\n`); 
          //run initial prompt
          askQuestions(); 
        }); 
      });
    }); 
  });
}


function addEmployee() {
  //first need to get the role names in order to execute inquirer prompt 
  let roleNames = []; 
  const query = "SELECT title FROM role"; 
  connection.query(query, function (err, res) {
    if (err) throw err;
    for(let i = 0; i < res.length; i++) {
      roleNames .push(res[i].title); 
    }

    //now prompt user for employee information 
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
        choices:roleNames, 
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
      //need to get roleID from role name in order to add to table entry 
      let roleID = null; 
      const roleQuery = "SELECT id FROM role WHERE ?"; 
      connection.query(roleQuery, {title:answers.employeeRole}, function (roleErr, roleRes) {
        if (roleErr) throw roleErr;
        roleID = roleRes[0].id; 

        //if the employee has a manager, we need to query to find the manager's id
        if(answers.hasManager) {
          //get manager ID from name provided by user so that it can be added to table entry 
          let managerID = null; 
          const managerQuery = "SELECT id FROM employee WHERE ? AND ?"; 
          connection.query(managerQuery, 
          [
            {first_name:answers.managerFirst},
            {last_name:answers.managerLast}
          ], 
          function (managerErr, managerRes) {
            if (managerErr) throw managerErr;
            managerID = managerRes[0].id; 

            console.log(managerID); 

            //build query to add employee
            const addQuery ="INSERT INTO employee SET ?"; 
            //run query to add employee
            connection.query(addQuery, 
            {
              first_name: answers.employeeFirst,
              last_name: answers.employeeLast,
              role_id: roleID,
              manager_id: managerID
            },
            function(err,res) {
              if(err) throw err; 
              //show success message
              console.log(`\n${answers.employeeFirst} ${answers.employeeLast} successfully added as an employee\n`); 
              //run initial prompt
              askQuestions(); 
            }); 
          });
        }
        //if the employee does not have a manager, just need to run the add query 
        else {
          //build query to add employee
          const addQuery ="INSERT INTO employee SET ?"; 
          //run query to add employee
          connection.query(addQuery, 
          {
            first_name: answers.employeeFirst,
            last_name: answers.employeeLast,
            role_id: roleID,
          },
          function(err,res) {
            if(err) throw err; 
            //show success message
            console.log(`\n${answers.employeeFirst} ${answers.employeeLast} successfully added as an employee\n`); 
            //run initial prompt
            askQuestions(); 
          });
        }
      });
    });
  });
}

//shows table of all department data 
function viewDepartments() {
  const query = "SELECT * FROM department"; 
  //run query 
  connection.query(query, function (err, res) {
    if (err) throw err;
    //display results 
    console.table(res);
    //run initial prompts 
    askQuestions(); 
  });
}

//shows table of all roles data
function viewRoles() {
  const query = "SELECT * FROM role";
  //run query 
  connection.query(query, function (err, res) {
    if (err) throw err;
    //display results 
    console.table(res);
    //run initial prompts 
    askQuestions(); 
  });
}

//shows table of all employees data
function viewEmployees() {
  const query = "SELECT * FROM employee"; 
  //run query 
  connection.query(query, function (err, res) {
    if (err) throw err;
    //display results 
    console.table(res);
    //run initial prompts 
    askQuestions(); 
  });
}

//updates the role of an employee 
function updateRole() {
  //first need to get the role names in order to execute inquirer prompt 
  let roleNames = []; 
  const query = "SELECT title FROM role"; 
  connection.query(query, function (err, res) {
    if (err) throw err;
    for(let i = 0; i < res.length; i++) {
      roleNames .push(res[i].title); 
    }
 
    //now prompt user for employee information 
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
        choices:roleNames, 
        message:"Select the employee's new role:",
        name:"employeeRole"
      }
    ])
    .then(function(answers){ 
      //need to get roleID from role name in order to add to table entry 
      let newRoleID = null; 
      //build query 
      const roleQuery = "SELECT id FROM role WHERE ?"; 
      //run query 
      connection.query(roleQuery, {title:answers.employeeRole}, function (roleErr, roleRes) {
        if (roleErr) throw roleErr;
        newRoleID = roleRes[0].id; 

        //build query to update role 
        const query = "UPDATE employee SET ? WHERE ? AND ?"
        //run query 
        connection.query(query,
        [
          {
            role_id:newRoleID
          },
          {
            first_name: answers.employeeFirst
          },
          {
            last_name: answers.employeeLast 
          }
        ],
        function(err, res) {
          if (err) throw err;
          //show success message 
          console.log(`\n${answers.employeeFirst} ${answers.employeeLast}'s role has been updated to ${answers.employeeRole}\n`); 
          //run initial prompts 
          askQuestions(); 
        });
      }); 
    }); 
  }); 
}



