const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected at ID" + connection.threadId);
  initPrompt();
});

function initPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What Would You Like To Do?",
        name: "choice",
        choices: [
          "Add department",
          "Add role",
          "Add employee",
          "View departments",
          "View roles",
          "View employees",
          "Update employee roles",
        ],
      },
    ])
    .then(function (val) {
      switch (val.choice) {
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "View departments":
          viewDepartments();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
        case "Update employee roles":
          updateEmployeeRoles();
          break;
      }
    });
}

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the department",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: res.name,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          initPrompt();
        }
      );
    });
};

const addRole = () => {
  connection.query(
    "SELECT role.title as TITLE, role.salary AS Salary FROM role",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the title of the role?",
          },
          {
            name: "Salary",
            type: "input",
            message: "What is their salary?",
          },
        ])
        .then(function (res) {
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              initPrompt();
            }
          );
        });
    }
  );
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter first name",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter last name",
      },
      {
        name: "role",
        type: "list",
        message: "What is the role",
        choices: selectRole(),
      },
    ])
    .then(function (val) {
      var roleId = selectRole().indexOF(val.role) + 1;
      connection.query("INSERT INTO employee SET ?"),
        {
          first_name: val.first,
          last_name: val.lastName,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(val);
          initPrompt();
        };
    });
};

const updateEmployeeRoles = () => {
  connection.query(
    "SELECT employee.last_name, role.title, FROM employee JOIN role ON employee.role_id = role.id",
    function (err, res) {
      if (err) throw err;
      inquirer.prompt([
        {
          name: "lastName",
          type: "rawlist",
          choices: (val) => {
            let roleID = selectRole().indexOF(val.role) + 1;
            connection.query("UPDATE employee SET WHERE ?"),
              {
                last_name: val.lastName,
              },
              {
                role_id: roleId,
              },
              function (err) {
                if (err) throw err;
                console.table(val);
                initPrompt();
              };
          },
        },
      ]);
    }
  );
};

const viewDepartments = () => {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;"),
    function(err,res){
        if (err) throw err
        console.table(res)
        initPrompt;
    }
}

const viewRoles = () => {
    connection.query("SELECT employee.first_name, employee.last_name, role.title as Title FROM employee JOIN role ON employee.role_id = role.id;"),
    function(err,res){
        if(err) throw err
        console.table(res)
        initPrompt();
    }
}
const viewEmployees = () => {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;"), 
  function(err, res) {
      if (err) throw err
      console.table(res)
      initPrompt();
  
  }}

  let roleArr = [];
const selectRole = () =>{
    connection.query("SELECT * FROM role", function(err,res){
        if (err) throw err
        for (var i = 0; i < res.length; i++){
            roleArr.push(res[i].title);
        }
    })
}