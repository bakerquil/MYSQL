DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)

);

INSERT INTO department (name) VALUE ('Sales'), ('Legal'), ('Executive'), ('IT');

INSERT INTO role (title,salary, department_id) VALUE ("Button Changer", 100000, 4),
("Lawyer",150000, 2),
("CEO", 300000, 3),
("Sales Lead", 50000,1);


INSERT INTO employee (first_name,last_name,manager_id,role_id) VALUE ("Baker", 'Quillin', null, 1),
("Zack", "Marcus", null, 2),
('Alex', 'Pappa', null, 3),
('Maria', 'Fishello', null, 4);



SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;