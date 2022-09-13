import express from "express";

const app = express();

app.get("/", (request, response) => response.send("Hello from Express!"));

app.listen(3000, () => {
    console.log("Application listening...");
});
