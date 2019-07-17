import express = require("express");
import v1Router from "./v1";

const app: express.Application = express();
app.use(express.json());
app.get("/", async (req, res) => {
    res.json({ message: "hooray! welcome to our api!" });
});

app.use("/v1", v1Router);

export default app;
