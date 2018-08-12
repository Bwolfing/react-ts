import * as express from "express";
import * as path from "path";
import * as process from "process";

import { Forums } from "@server/controllers/forums";

const app = express();

const dist = path.join(process.cwd(), "dist");

console.log(`Application path: ${dist}`)

app.use(express.static(dist));
app.use(express.static(path.join(dist, "assets")));

app.get("/api/todos", (request, response) => {
    setTimeout(() => {
        if (new Date(Date.now()).getSeconds() % 2) {
            response.statusMessage = "Intentional failure";
            response.status(400).send({
                error: "Bad Request",
                errorDetail: "Wanted an intentional error"
            });
            return;
        }

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
        ])
    }, 3000);
});

app.get("/api/forums", Forums);

app.get("*", (request: express.Request, response: express.Response) => {
    response.sendFile(path.join(dist, "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port " + port.toString()));