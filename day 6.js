// const EventEmitter = require("events");

// // Create an EventEmitter object
// const emitter = new EventEmitter();

// // Register event listeners (like addEventListener)
// emitter.on("click", () => {
//     console.log("Button clicked!");
// });

// emitter.on("mouseover", () => {
//     console.log("Mouse is over the button!");
// });

// // Trigger events (like DOM events)
// console.log("Simulating Events...\n");

// emitter.emit("click");
// emitter.emit("mouseover");

// import fs from "fs/promises";

// const fileName = "student.txt";

const fs = require("fs").promises;

const fileName = "student.txt";

// 1. CREATE
async function createFile() {
    try {
        await fs.writeFile(
            fileName,
            "Name: Rashmi\nCourse: B.Tech CSE",
            "utf8"
        );

        console.log("File created successfully");
    } catch (error) {
        console.log("Error:", error.message);
    }
}


// 2. READ
async function readFile() {
    try {
        const data = await fs.readFile(fileName, "utf8");

        console.log("\nFile Content:");
        console.log(data);
    } catch (error) {
        console.log("Error:", error.message);
    }
}


// 3. UPDATE
async function updateFile() {
    try {
        await fs.appendFile(
            fileName,
            "\nCollege: ABES Engineering College",
            "utf8"
        );

        console.log("\nFile updated successfully");
    } catch (error) {
        console.log("Error:", error.message);
    }
}


// 4. DELETE
async function deleteFile() {
    try {
        await fs.unlink(fileName);

        console.log("\nFile deleted successfully");
    } catch (error) {
        console.log("Error:", error.message);
    }
}


// Execute CRUD operations
async function main() {
    await createFile();
    await readFile();
    await updateFile();
    // await deleteFile();
}

main();




//File module : fs module in node js
//CRUD operation: Create, Read, Update, Delete
//create a file: writefile() and readfile() 
