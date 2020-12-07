const inquirer = require("inquirer");
const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_trackerDB"
});


connection.connect(function(err){
    if (err) throw err
    console.log("Connected at ID" + connection.threadId)
    initPrompt();
});

function initPrompt(){
    inquirer.prompt([
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
             "Update employee roles"   
            ]
        }
    ]).then(function(expression){
        switch (expression.choices){
            case "Add department":
                addDepartment()
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
    })
};

const addDepartment = () => {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the name of the department"
        }
    ]).then(function(res){
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: res.name
            },
            function(err){
                if (err) throw err
                console.table(res);
                initPrompt();
            }
        )
    })

};

const addRole = () => {
    connection.query("SELECT role.title as TITLE, role.salary AS Salary FROM role", function(err,res){
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "What is the title of the role?"
            },{
                name: "Salary",
                type: "input",
                message: "What is their salary?"
            }
        ]).then(function(res){
            connection.query(
                "INSERT INTO role SET ?",{
                    title: res.Title,
                    salary: res.Salary,
                },
                function(err){
                    if (err) throw err
                    console.table(res);
                    initPrompt();
                }
            )
        });
    });
}