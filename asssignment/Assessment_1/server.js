const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    // Show form
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });

        res.end(`
            <h1>Student Record Management</h1>

            <form method="POST" action="/add-student">

                <label>Student Name:</label>
                <input type="text" name="name" required><br><br>

                <label>Roll Number:</label>
                <input type="text" name="roll" required><br><br>

                <label>Course:</label>
                <input type="text" name="course" required><br><br>

                <label>Email:</label>
                <input type="email" name="email" required><br><br>

                <button type="submit">Add Student</button>
            </form>

            <br>
            <a href="/students">View Students</a>
        `);
    }

    // Add student
    else if (req.url === "/add-student" && req.method === "POST") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            const data = new URLSearchParams(body);

            const student = {
                name: data.get("name"),
                roll: data.get("roll"),
                course: data.get("course"),
                email: data.get("email")
            };

            let students = [];

            if (fs.existsSync("students.json")) {
                students = JSON.parse(
                    fs.readFileSync("students.json", "utf8")
                );
            }

            students.push(student);

            fs.writeFileSync(
                "students.json",
                JSON.stringify(students, null, 2)
            );

            res.writeHead(302, {
                Location: "/students"
            });

            res.end();
        });
    }

    // Display students
    else if (req.url === "/students" && req.method === "GET") {

        fs.readFile("students.json", "utf8", (err, data) => {

            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error reading students");
                return;
            }

            const students = JSON.parse(data);

            res.writeHead(200, { "Content-Type": "text/html" });

            let html = "<h1>Student Records</h1>";

            students.forEach((student, index) => {
                html += `
                    <p>
                        ${index + 1}.
                        Name: ${student.name},
                        Roll: ${student.roll},
                        Course: ${student.course},
                        Email: ${student.email}
                    </p>
                `;
            });

            res.end(html);
        });
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});