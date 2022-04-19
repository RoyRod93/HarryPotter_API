const express = require('express');
const { getCharacters, getCharacterById, addOrUpdateCharacter, deleteCharacterById } = require('./dynamo');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
    console.log('listening on port');
});

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/characters', async (req, res) => {
    try {
        const characters = await getCharacters();
        res.json(characters);
    } catch (error) {
        console.log(err);
        res.status(500).json({ err: 'Something wrong with this site' });

    }
});

app.get('/characters/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const characters = await getCharacterById(id);
        res.json(characters);
    } catch (error) {
        console.log(err);
        res.status(500).json({ err: 'Something wrong with this site' });

    }
});

app.post('/characters', async (req, res) => {
    const character = req.body;
    try {
        const newCharacterEntry = await addOrUpdateCharacter(character);
        res.json(newCharacterEntry);
    } catch (error) {
        console.log(err);
        res.status(500).json({ err: 'Something wrong with this site' });

    }
});

app.put('/characters/:id', async (req, res) => {
    const character = req.body;
    const { id } = req.params;
    character.id = id;
    try {
        const updateCharacterEntry = await addOrUpdateCharacter(character);
        res.json(updateCharacterEntry);
    } catch (error) {
        console.log(err);
        res.status(500).json({ err: 'Something wrong with this site' });

    }
});

app.delete('/characters/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await deleteCharacterById(id));
    } catch (error) {
        console.log(err);
        res.status(500).json({ err: 'Something wrong with this site' });

    }
});


