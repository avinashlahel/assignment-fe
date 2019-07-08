# AssignmentFe

Following tools have been used for this project

- Angular 8
- Angular CLI
- Angular Material (responsive UI)

## What does the app do ?

- The app can be used to upload a CSV file and display the parsed contents in a table.
- The uploaded content can then be filtered in ascending/descending order by clicking the Issues column
- Only CSV files would be allowed, others would prompt as not allowed.

## Running it locally

To run the project locally, execute the following commands :

1) git clone https://github.com/avinashlahel/assignment-fe.git
2) npm install
3) ng serve 
4) Navigate to http://localhost:4200 
5) Click on choose a file and then click on Upload

Before running these, make sure you have node(v10+) and angular CLI installed globally

## Issues Running locally ?

Incase you are not able to run the project locally, you can also have a look
at the running project deployed on netlify :

https://avinash-lahel.netlify.com/

## Main Component

The main component of the project is 'file-upload' component.
The logic to read and parse the uploaded file is written in :
file-upload.component.ts 
(https://github.com/avinashlahel/assignment-fe/blob/master/src/app/file-upload/file-upload.component.ts)

## Running unit tests

Run `ng test` to execute the unit tests via [Karma]

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

