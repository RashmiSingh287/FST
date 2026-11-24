const fs = require('fs');

// CREATE - Write data into file
fs.writeFileSync('student.txt', 'Name: Rashmi');

console.log('File created successfully');

// READ - Read file data
let data = fs.readFileSync('student.txt', 'utf8');

console.log('File Data:', data);

// UPDATE - Append new data
fs.appendFileSync('student.txt', '\nCourse: B.Tech CSE');

console.log('File updated successfully');

// READ updated data
data = fs.readFileSync('student.txt', 'utf8');

console.log('Updated Data:\n' + data);

// DELETE - Delete file
fs.unlinkSync('student.txt');

console.log('File deleted successfully');