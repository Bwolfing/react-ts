import { ServerApp } from "@server/app";

const port = process.env.PORT || 5000;
ServerApp.listen(port, () => console.log("Listening on port " + port.toString()));