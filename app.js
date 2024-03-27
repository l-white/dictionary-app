console.log("JS is connected")

axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/keyboard')
    .then(function (response) {
        const entry = response.data[0];
        console.log(entry);
        const word = entry.word;
        const h1 = document.createElement('h1');
        h1.textContent = word;

        const pronumciation = document.createElement('p');
        pronumciation.textContent = entry.phonetics[1].text;

        const meanings = entry.meanings;
        const meaningsList = document.getElementById('meaningsList');

        meanings.forEach(meaning => {
            if (meaning !== undefined) {

                const listItem = document.createElement('p');
                listItem.textContent = meaning.partOfSpeech;
                meaningsList.appendChild(listItem);

                const meaningText = document.createElement('p');
                meaningText.textContent = "Meaning";
                meaningsList.appendChild(meaningText);

                for (let k = 0; k < meaning.definitions.length; k++) {
                    const definition = document.createElement('li');
                    definition.textContent = meaning.definitions[k].definition;
                    meaningsList.appendChild(definition);
                }

                if (meaning.synonyms[0] !== undefined) {
                    const synonym = document.createElement('p');
                    synonym.textContent = "Synonyms" + " " + meaning.synonyms[0];
                    meaningsList.appendChild(synonym);
                }
            }
        })

        const url = document.createElement('p');
        url.textContent = entry.sourceUrls[0];

        const contentDiv = document.getElementById('content');

        contentDiv.appendChild(h1);

        contentDiv.appendChild(pronumciation);

        contentDiv.appendChild(url);

    })
    .catch(function (error) {
        console.error('Error:', error);
    });