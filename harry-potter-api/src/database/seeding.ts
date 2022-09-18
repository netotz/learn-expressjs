import axios from 'axios';
import { Character } from '../models/Character';
import { putCharacter } from './methods';
async function seedDatabase() {
    const url = "https://hp-api.herokuapp.com/api/characters/students";
    const { data } = await axios.get<Character[]>(url);

    await Promise.all(data.map((character, i) => {
        character.id = i.toString();
        return putCharacter(character);
    }));
}

(async () => await seedDatabase())();
