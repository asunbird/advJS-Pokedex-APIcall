// ........... POKEDEX Fetch
const containerPokedex = document.getElementById("pokedex");

if (containerPokedex) {
    const fetchPokemon = async () => {
        for (let i = 1; i <= 12; i++) {

        }

    }  
    
    fetchPokemon();
}



// ........... THE POKEMON SEARCH ..............
const searchPokemon = document.getElementById("searchBtn");
const nameIdInput = document.getElementById("name-id");


if (searchPokemon && nameIdInput) {
    searchPokemon.addEventListener("click", async (event) => {
        event.preventDefault(); // keep wave from form behavior
        const query = nameIdInput?.value?.trim(); // query reads user input.
        // (?.) ensures that if nameIdInput is null or undefined returns undefined instead an error.
        // This prevents runtime crashes in cases where the element might not exist.
        // Next, .value accesses the current value of the input field as a string, this is the user-entered text. 
        // The .trim() method then removes any leading or trailing whitespace from that string

        if (!query) {
            alert("Enter Pokemon name or id to search for!");
            searchPokemon.style.backgroundColor = "grey";
            setTimeout(() => {
            searchPokemon.style.backgroundColor = "white";
            }, 150);
            return;
        }

        // search logic here (fetch, render, etc.)
            // button color changes
        searchPokemon.style.backgroundColor = "green";
            // immediate toggle style
        setTimeout(() => {
            searchPokemon.style.backgroundColor = "white";
        }, 150);

            
        // Send a request by Pokemon ID or name to the server of PokeApi using Fetch API

            // Extract the actual user input value
        let searchInputData = document.getElementById("name-id").value;

        const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInputData}`);
        
        if (apiResponse.ok) {
            const pokResponseData = await apiResponse.json();
            console.log(pokResponseData);
            nameIdInput.value = "";
        }

    });
}

