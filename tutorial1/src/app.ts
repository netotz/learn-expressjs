import express from "express";

const app = express();
app.use(express.json());

app.get("/", (request, response) => response.send("Hello from Express!"));

app.post("/api/data", (request, response) => {
    console.log(request.body);
    return response.sendStatus(200);
});

app.route("/api/chained")
    .get((request, response) => response.send("A GET"))
    .post((request, response) => response.send("A POST"))
    // rest of the HTTP methods
    .all((request, response) => response.send("Any"));

// request parameters
app.get("/api/data/:id", (request, response) => response.send(request.params));

app.listen(3000, () => {
    console.log("Application listening...");
});
