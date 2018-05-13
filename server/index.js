const express = require("express");
const path = require("path");
const app = express();

const root = path.join(__dirname, "../");
const dist = path.join(root, "dist");

app.use(express.static(dist));

app.get("/app.js", (request, response) => {
    response.sendFile(path.join(dist, "app.js"))
});

app.get("/app.js.map", (request, response) => {
    response.sendFile(path.join(dist, "app.js.map"))
});

app.get("*", (request, response) => {
    response.sendfile(path.join(root, "index.html"));
});

app.listen(3000, () => console.log("Listening on port 3000"));
