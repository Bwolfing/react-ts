import { ServerApp } from "@server/app";

const port = process.env.PORT || 5000;

new ServerApp().start(port);