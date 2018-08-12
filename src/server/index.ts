import * as express from "express";
import * as path from "path";
import * as process from "process";

const app = express();

const dist = path.join(process.cwd(), "dist");

console.log(`Application path: ${dist}`)

app.use(express.static(dist));
app.use(express.static(path.join(dist, "assets")));

app.get("*", (request: express.Request, response: express.Response) => {
    response.sendFile(path.join(dist, "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port " + port.toString()));