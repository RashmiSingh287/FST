#### EXPERIMENT-7## 
Windows PowerShell 5.1
Copyright (C) Microsoft Corporation. All rights reserved.

PS C:\Users\RASHMI> mongosh
Current Mongosh Log ID: 6b03c3ecdd761f4af79b6df5
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.14.2
Using MongoDB:          9.0.8
Using Mongosh:          2.14.2
mongosh 2.14.3 is available for download: https://www.mongodb.com/try/download/shell

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/

------
   The server generated these startup warnings when booting
   2026-11-22T20:34:02.373+05:30: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
------

test> db.createCollection("Students")
{ ok: 1 }
test> show collections
Students

### EXPERIMENT -8 ###
Students
test> db.Students.insertMany([
|   {rollNo: 1, name: "Riya", age: 19, course: "CSE"},
|   {rollNo: 2, name: "Aman", age: 21, course: "CSE"},
|   {rollNo: 3, name: "Rahul", age: 22, course: "IT"},
|   {rollNo: 4, name: "Priya", age: 20, course: "CSE"},
|   {rollNo: 5, name: "Karan", age: 23, course: "IT"}
| ])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6b03c41ddd761f4af79b6df6'),
    '1': ObjectId('6b03c41ddd761f4af79b6df7'),
    '2': ObjectId('6b03c41ddd761f4af79b6df8'),
    '3': ObjectId('6b03c41ddd761f4af79b6df9'),
    '4': ObjectId('6b03c41ddd761f4af79b6dfa')
  }
}
test> db.Students.find()
[
  {
    _id: ObjectId('6b03c41ddd761f4af79b6df6'),
    rollNo: 1,
    name: 'Riya',
    age: 19,
    course: 'CSE'
  },
  {
    _id: ObjectId('6b03c41ddd761f4af79b6df7'),
    rollNo: 2,
    name: 'Aman',
    age: 21,
    course: 'CSE'
  },
  {
    _id: ObjectId('6b03c41ddd761f4af79b6df8'),
    rollNo: 3,
    name: 'Rahul',
    age: 22,
    course: 'IT'
  },
  {
    _id: ObjectId('6b03c41ddd761f4af79b6df9'),
    rollNo: 4,
    name: 'Priya',
    age: 20,
    course: 'CSE'
  },
  {
    _id: ObjectId('6b03c41ddd761f4af79b6dfa'),
    rollNo: 5,
    name: 'Karan',
    age: 23,
    course: 'IT'
  }
]
test> db.Students.find({age: {$gt: 20}})
[
  {
    _id: ObjectId('6b03c41ddd761f4af79b6df7'),
    rollNo: 2,
    name: 'Aman',
    age: 21,
    course: 'CSE'
  },
  {
    _id: ObjectId('6b03c41ddd761f4af79b6df8'),
    rollNo: 3,
    name: 'Rahul',
    age: 22,
    course: 'IT'
  },
  {
    _id: ObjectId('6b03c41ddd761f4af79b6dfa'),
    rollNo: 5,
    name: 'Karan',
    age: 23,
    course: 'IT'
  }
]
test> db.Students.updateOne(
|   {name: "Aman"},
|   {$set: {age: 22}}
| )
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
test> db.Students.deleteOne({name: "Karan"})
{ acknowledged: true, deletedCount: 1 }
test> db.Students.find()
[
  {
    _id: ObjectId('6b03c41ddd761f4af79b6df6'),
    rollNo: 1,
    name: 'Riya',
    age: 19,
    course: 'CSE'
  },
  {
    _id: ObjectId('6b03c41ddd761f4af79b6df7'),
    rollNo: 2,
    name: 'Aman',
    age: 22,
    course: 'CSE'
  },
  {
    _id: ObjectId('6b03c41ddd761f4af79b6df8'),
    rollNo: 3,
    name: 'Rahul',
    age: 22,
    course: 'IT'
  },
  {
    _id: ObjectId('6b03c41ddd761f4af79b6df9'),
    rollNo: 4,
    name: 'Priya',
    age: 20,
    course: 'CSE'
  }
]
test>