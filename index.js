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

//TODO
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
      const query = "SELECT id FROM department WHERE ?"; 
      connection.query(query, {name:answers.roleDepartment}, function (idErr, idRes) {
        if (idErr) throw idErr;
        departmentID = idRes[0].id; 


        //TODO: query to add 
      });
    }) 
  });
}

//TODO
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
      const query = "SELECT id FROM role WHERE ?"; 
      connection.query(query, {title:answers.employeeRole}, function (roleErr, roleRes) {
        if (roleErr) throw roleErr;
        roleID = roleRes[0].id; 

        //TODO: manager id query and add query OR just add query 
        //if the employee has a manager, we need to query to find the manager's id
        if(answers.hasManager) {
          //get department ID from department name provided by user so that it can be added to table entry 
          let managerID = null; 
          const query = "SELECT id FROM employee WHERE ? AND ?"; 
          connection.query(query, 
          [
            {first_name:answers.managerFirst},
            {last_name:answers.managerLast}
          ], 
          function (managerErr, managerRes) {
            if (managerErr) throw managerErr;
            managerID = managerRes[0].id; 

            console.log(managerID); 

            //TODO: query to add 
          });
        }
        else {

          //TODO: query to add 
        }
      });
  
      
    })
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



