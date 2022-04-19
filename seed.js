const axios = require('axios');
const { addOrUpdateCharacter } = require('./dynamo');

const seedData = async () => {
    const url = 'http://hp-api.herokuapp.com/api/characters';
    try {
        const { data: hpCharacters } = await axios.get(url);
        const hpCharacterPromises = hpCharacters.map((character, i) =>
            addOrUpdateCharacter({ ...character, id: i + '' })
        );

        await Promise.all(hpCharacterPromises);
        console.log('Data populated in DynamoDB');

    } catch (error) {
        console.error(error);
        console.log('Something\'s wrong');
    }
}

seedData();