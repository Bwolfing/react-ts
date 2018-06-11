const express = require("express");
const path = require("path");
const app = express();

const root = path.join(__dirname, "../");
const dist = path.join(root, "dist");

app.use(express.static(dist));
app.use(express.static(path.join(root, "assets")));

app.get("/app.js", (request, response) => {
    response.sendFile(path.join(dist, "app.js"))
});
app.get("/app.js.map", (request, response) => {
    response.sendFile(path.join(dist, "app.js.map"))
});

app.get("/styles.css", (request, response) => {
    response.sendFile(path.join(dist, "styles.css"));
});
app.get("/styles.css.map", (request, response) => {
    response.sendFile(path.join(dist, "styles.css.map"));
});

app.get("*", (request, response) => {
    response.sendFile(path.join(root, "index.html"));
});

app.listen(3000, () => console.log("Listening on port 3000"));
