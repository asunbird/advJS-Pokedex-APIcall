// ........... POKEDEX Fetch Auto Generate ...................
    // automatically generates 151 Pokemon cards on the Bench page
const containerPokedex = document.getElementById("pokedex"); // div container where All Pokemon Cards will be located
const autoGenerateBtn = document.getElementById("autogenBtn"); // "Auto Generate" button

if (containerPokedex) {
    const fetchPokemon = async () => {
        for (let i = 1; i <= 12; i++) {

        }

    }  
    
    fetchPokemon();
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
            // button color changes
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

