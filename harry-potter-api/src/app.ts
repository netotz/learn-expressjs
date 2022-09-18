import { deleteCharacterById, getCharacterById, getCharacters } from "./database/methods";
import express from "express";

const app = express();

app.get("/characters", async (request, response) => {
    const characters = await getCharacters();
    return response.json(characters);
});

app.get("/characters/:id", async (request, response) => {
    const id = request.params.id;
    const character = await getCharacterById(id);
    return character == null ? response.sendStatus(404) : response.json(character);
});

app.delete("/characters/:id", async (request, response) => {
    const id = request.params.id;
    const result = await deleteCharacterById(id);
    return response.sendStatus(result || 500);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});