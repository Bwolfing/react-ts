const express = require("express");
const path = require("path");
const app = express();

const root = path.join(__dirname, "../");
const dist = path.join(root, "dist");

app.use(express.static(dist));
app.use(express.static(path.join(root, "assets")));

app.get("/api/todos", (request, response) => {
    response.send([
        {
            id: 1,
            completed: true,
            text: "Read about React"
        },
        {
            id: 2,
            completed: true,
            text: "Build with React"
        },
        {
            id: 3,
            completed: false,
            text: "Read about Redux"
        },
        {
            id: 4,
            completed: false,
            text: "Build with Redux"
        },
    ]);
});

app.get("*", (request, response) => {
    response.sendFile(path.join(root, "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port " + port.toString()));
