// ........... POKEDEX Fetch Auto Generate ...................
    // automatically generates 30 (1 page for pagination) Pokemon cards on the Bench page
const containerPokedex = document.getElementById("pokedex"); // div container where All Pokemon Cards will be located
const autoGenerateBtn = document.getElementById("autogenBtn"); // "Auto Generate" button

if (containerPokedex && autoGenerateBtn ) {
    autoGenerateBtn.addEventListener("click", async (event) => {
        event.preventDefault(); // keep wave from form behavior
        
        // button color changes shows that button clicked
        autoGenerateBtn.style.backgroundColor = "green";
            // immediate toggle style
            setTimeout(() => {
                autoGenerateBtn.style.backgroundColor = "white";
            }, 150);

        // fetch loop for 30 Pokemons (1 page)
        async function fetchAutoPokemon(num, page, index) {
            let i = 1;
            while (i <= num) {
                pokemonIndex = index.toString();
                const apiAutoPokResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);

                if (apiAutoPokResponse.ok) {
                    const autoPokRespData = await apiAutoPokResponse.json();
                    console.log("found:", autoPokRespData);
                    index++;
                    i++;
                } else if (apiAutoPokResponse.status === 404) {
                    index++;
                    return; // There are some Pokemons that don’t exist but should, 999 doesn’t exist but 1000 does.
                } else {
                    console.error("API error", apiAutoPokResponse.status);
                    alert(`Error: ${apiAutoPokResponse.status}`);
                }
            }
            console.log(`Generated ${num} pokemons, on the ${page} page, and the last index is ${index}`);
        }
        

        fetchAutoPokemon(30, 1, 1);

    });  
}



// ........... THE POKEMON SEARCH ..............
const searchPokemonBtn = document.getElementById("searchBtn");
const nameIdInput = document.getElementById("name-id");


if (searchPokemonBtn && nameIdInput) {
    searchPokemonBtn.addEventListener("click", async (event) => {
        event.preventDefault(); // keep wave from form behavior
        const query = nameIdInput?.value?.trim(); // query reads user input.
        // (?.) ensures that if nameIdInput is null or undefined returns undefined instead an error.
        // This prevents runtime crashes in cases where the element might not exist.
        // Next, .value accesses the current value of the input field as a string, this is the user-entered text. 
        // The .trim() method then removes any leading or trailing whitespace from that string

        if (!query) {
            alert("Enter Pokemon name or id to search for!");
            searchPokemonBtn.style.backgroundColor = "grey";
            setTimeout(() => {
            searchPokemonBtn.style.backgroundColor = "white";
            }, 150);
            return;
        }

        // search logic here (fetch, render, etc.)
            // button color changes shows that button clicked
        searchPokemonBtn.style.backgroundColor = "green";
            // immediate toggle style
        setTimeout(() => {
            searchPokemonBtn.style.backgroundColor = "white";
        }, 150);

            
        // Send a request by Pokemon ID or name to the server of PokeApi using Fetch API

            // Extract the actual user input value
        let searchInputData = document.getElementById("name-id").value;

            // simple GET request:
        const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInputData}`);
        
        if (apiResponse.ok) {
            const pokResponseData = await apiResponse.json();
            console.log("found:", pokResponseData);
            nameIdInput.value = ""; // clear input field
        } else if (apiResponse.status === 404) {
            console.warn(`${searchInputData} doesn't exist.`);
            alert(`Pokemon "${searchInputData}" not found.`);
            // There are some Pokemons that don’t exist but should, 999 doesn’t exist but 1000 does.
        } else {
            console.error("API error", apiResponse.status);
            alert(`Error: ${apiResponse.status}`);
        }

    });
}

