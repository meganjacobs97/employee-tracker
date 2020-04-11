# Employee Tracker 

## A command-line application for managing a company's employees built using node, inquirer prompts, and MySQL.

Current functionality includes: 
* add departments, roles, employees
* view departments, roles, employees 
* update employee roles

## Installation 

To run and develop the code for yourself, you can use an IDE such as [VS Code](https://code.visualstudio.com/). 

In order to use this application as intended, you must have Node.js installed. You can download it [here](https://nodejs.org/en/download/). Step-by-step installation instructions can be found [here](https://phoenixnap.com/kb/install-node-js-npm-on-windows). 

You must also install Inquirer (for prompting the user) and mysql (for interacting with the database), which you can do by calling `npm init` and `npm install` from the command line. For more detailed information, check out the documentation for [Inquirer](https://www.npmjs.com/package/inquirer) and [mysql](https://www.npmjs.com/package/mysql). 

To get the database up and running, you can use the schema and the seeds provided. I used [MySQL](https://dev.mysql.com/downloads/mysql/) with [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) as an editor. 

## Usage  

![usage](readme_assets/usage.gif)

To begin the application, run `node index.js` from the command line. Then, fill in the information as prompted. The database will be updated accordingly. 

## License

MIT License

Copyright © 2020 Megan Jacobs

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.