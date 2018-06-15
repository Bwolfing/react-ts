const express = require("express");
const path = require("path");
const app = express();

const root = path.join(__dirname, "../");
const dist = path.join(root, "dist");

app.use(express.static(dist));
app.use(express.static(path.join(root, "assets")));

app.get("*", (request, response) => {
    response.sendFile(path.join(root, "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port " + port.toString()));
