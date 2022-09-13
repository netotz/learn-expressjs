import express from "express";

const app = express();
app.use(express.json());

app.get("/", (request, response) => response.send("Hello from Express!"));

app.post("/api/data", (request, response) => {
    console.log(request.body);
    return response.sendStatus(200);
});

app.listen(3000, () => {
    console.log("Application listening...");
});
