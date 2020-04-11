DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    -- department name
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    -- role title
    title VARCHAR(30) NOT NULL,
    -- role salary
    salary DECIMAL NOT NULL,
    -- reference to department that role belongs to
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NUll,
    -- reference to role that employee has 
    role_id INT NOT NULL,
    -- holds regerence to another employee that is the employee's manager; may be null if no manager 
    manager_id INT,
    PRIMARY KEY (id)
); 