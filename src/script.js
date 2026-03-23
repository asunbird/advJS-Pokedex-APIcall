const searchPokemon = document.getElementById("searchBtn");
const nameIdInput = document.getElementById("name-id");


if (searchPokemon && nameIdInput) {
    searchPokemon.addEventListener("click", (event) => {
        event.preventDefault(); // keep wave from form behavior
        const query = nameIdInput?.value?.trim(); // query reads user input.
        // (?.) ensures that if nameIdInput is null or undefined returns undefined instead an error.
        // This prevents runtime crashes in cases where the element might not exist.
        // Next, .value accesses the current value of the input field as a string, this is the user-entered text. 
        // The .trim() method then removes any leading or trailing whitespace from that string

        if (!query) {
            searchPokemon.style.backgroundColor = "grey";
            setTimeout(() => {
            searchPokemon.style.backgroundColor = "white";
            }, 150);
            return;
        }

        // search logic here (fetch, render, etc.)
        searchPokemon.style.backgroundColor = "green";
        // immediate toggle style
        setTimeout(() => {
            searchPokemon.style.backgroundColor = "white";
        }, 150);

    });
}

