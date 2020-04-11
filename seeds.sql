USE company_db;

INSERT INTO department(name)
VALUES("Administration"),("Engineering"); 

INSERT INTO role(title,salary,department_id)
VALUES("CEO",250000,1),("CTO",225000,1),("Senior Developer",125000,2),("Junior Developer",70000,2);

INSERT INTO employee(first_name,last_name,role_id)
VALUES("Rory","Kees",1); 

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES("John","Smith",2,1),("Jane","Doe",3,2),("Tarou","Yamada",4,3)

