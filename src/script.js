// ........... POKEDEX Fetch Auto Generate ...................
    // automatically generates 30 (1 page for pagination) Pokemon cards on the Bench page
const containerPokedex = document.getElementById("pokedex-cards"); // div container where All Pokemon Cards will be located
const autoGenerateBtn = document.getElementById("autogenBtn"); // "Auto Generate" button for 30 Pokemons

// State variables to remember the last fetched pokemon index and current page
let currentFetchIndex = 1;
let currentPage = 1;

if ( autoGenerateBtn ) {
    autoGenerateBtn.addEventListener("click", async (event) => {
        event.preventDefault(); // keep wave from form behavior
        
        // update button state/text to show the loading progress
        autoGenerateBtn.value = `Loading Page ${currentPage}...`;
        
        // button color changes shows that button clicked
        autoGenerateBtn.style.backgroundColor = "green";
            // immediate toggle style
            setTimeout(() => {
                autoGenerateBtn.style.backgroundColor = "white";
            }, 150);

        // fetch loop for 30 Pokemons (1 page)
        async function fetchAutoPokemon(num, page, startIndex) {
            const pokemons = [];
            let i = 1;
            let index = startIndex; 
            // Use local variable for loop to keep Semantic Clarity (Naming) and Guarding the Original Value
            // It is a "best practice" to not mutate your arguments. 
            // This keeps functions predictable and makes debugging easier because the input variables stay exactly as they were when the function was called.

            while (i <= num) {
                let pokemonIndex = index.toString();
                const apiAutoPokResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);

                if (apiAutoPokResponse.ok) {
                    const autoPokRespData = await apiAutoPokResponse.json();
                    console.log("found:", autoPokRespData);
                    
                    // Map API data to custom Pokemon structure
                    const pokemonData = {
                        thumbnail: autoPokRespData.sprites.other?.['official-artwork']?.front_default || autoPokRespData.sprites?.front_default || "./media/default.png",
                        id: autoPokRespData.id,
                        name: autoPokRespData.name.charAt(0).toUpperCase() + autoPokRespData.name.slice(1),
                        type: autoPokRespData.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
                        level: 1, // Default starting level
                        maxHp: autoPokRespData.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
                        attackPower: autoPokRespData.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
                        defensePower: autoPokRespData.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
                        speed: autoPokRespData.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
                        expToNextLevel: 100, // Default
                        evolutionLevel: null // Not available in API, set to null
                    };
                    
                    pokemons.push(pokemonData);
                    index++;
                    i++;
                } else if (apiAutoPokResponse.status === 404) {
                    index++;
                    // Skip missing Pokemon
                } else {
                    console.error("API error", apiAutoPokResponse.status);
                    alert(`Error: ${apiAutoPokResponse.status}`);
                    break; // Stop on error
                }
            }
            console.log(`Generated ${pokemons.length} pokemons, on the ${page} page, and the last index is ${index}`);
            
            // Update the state variables so next time we click, we continue from here
            currentFetchIndex = index;
            currentPage = page + 1;
            
            return pokemons;
        }
        
        // Fetch using our state variables
        const autoPokemons = await fetchAutoPokemon(30, currentPage, currentFetchIndex);
        
        // Render all fetched Pokemons (append them to existing cards)
        autoPokemons.forEach(pokemon => renderPokemonCard(pokemon));
        
        // Reset button text to prompt for the next page
        autoGenerateBtn.value = `Load Next 30 (Page ${currentPage})`;

        // Add Page number HTML
        const pagination = document.getElementById("pagination");
        const addCurPage = pagination.innerHTML += `<span>${currentPage - 1}</span>`;
        console.log(addCurPage);
    });  
}

// ........... THE POKEMON SEARCH Fetch by name or id (To add new Pokemon to the board) ..............
const searchPokemonBtn = document.getElementById("searchAddBtn");
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
        
        // API response check
        if (apiResponse.ok) {
            const pokResponseData = await apiResponse.json();
            console.log("found:", pokResponseData);
            
            // Map API data to your custom Pokemon structure
            const pokemonData = {
                thumbnail: pokResponseData.sprites.other?.['official-artwork']?.front_default || pokResponseData.sprites?.front_default || "./media/default.png",
                id: pokResponseData.id,
                name: pokResponseData.name.charAt(0).toUpperCase() + pokResponseData.name.slice(1),
                type: pokResponseData.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
                level: 1, // Default starting level
                maxHp: pokResponseData.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
                attackPower: pokResponseData.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
                defensePower: pokResponseData.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
                speed: pokResponseData.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
                expToNextLevel: 100, // Default
                evolutionLevel: null // Not available in API, set to null
            };
            
            let pokemonPageData = [pokemonData];
            
            // Render the new card (append to existing cards)
            renderPokemonCard(pokemonPageData[0]);
            
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

// ........... RENDER Pokemon's CARDS ..............
    // function for rendering Pokemon Card with Pokemon's Parameters
// containerPokedex declared at top

// Function to render a single Pokemon card
function renderPokemonCard(pokemon) {
    // Format the ID number into a string and ensures it is always 4 characters long by adding zeroes to the front. 
    // So, 1 becomes "0001", and 25 becomes "0025".
    const formattedId = pokemon.id.toString().padStart(4, '0');
    pokemon.id = formattedId;

    // Create a card element - a list item (<li>) with the class "card" to hold the Pokémon's information.
    // document.createElement("...") is generating a brand new HTML tag in its memory. 
    const card = document.createElement("li");
    // Once an element is created, JavaScript adds CSS classes to it (e.g., card.classList.add("card")) to style it with CSS.
    card.classList.add("card");

    // Create an image element (<img>) for the thumbnail with the class "cardimg". 
    // its source path in the thumbnail parameter of array object and alt text to the Pokémon's name.
    const img = document.createElement("img");
    img.classList.add("cardimg");
    // assigns the specific data from your array to the elements. 
    // For example, it sets the image's source (img.src = pokemon.thumbnail)
    img.src = pokemon.thumbnail;
    img.alt = pokemon.name;
    img.loading = "lazy";

    // Create a (<div>) for the Pokémon information with the class "cardinf".
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("cardinf");

    // Create a span for the Pokémon "Index" and the formatted ID inside a div with the class "pokemon-index"
    const pokemonIndex = document.createElement("div"); 
    pokemonIndex.classList.add("pokemon-index");
    // assigns the specific data from your array to the element and fill the text areas using .innerHTML
    pokemonIndex.innerHTML = `<span>#</span><span>${pokemon.id}</span>`;

        // Create a div for the Pokémon name with the class "pokemon-name", assigns data from array.
    const pokemonName = document.createElement("div");
    pokemonName.classList.add("pokemon-name");
    pokemonName.innerHTML = `<div>${pokemon.name}</div>`;

    // Create a div for the Pokémon type with the class "pokemon-type"
    const pokemonType = document.createElement("div");
    pokemonType.classList.add("pokemon-type");
    // Define an array of type-color pairs to determine the color based on the Pokémon's type.
    let typeColorArr = [
        {type: "Grass", color: "#89dd65"}, 
        {type: "Poison", color: "#a33ea1"},
        {type: "Fire", color: "#f08030"},
        {type: "Bug", color: "#587c14"},
        {type: "Normal", color: "#949393"},
        {type: "Electric", color: "#ebdb2a"},
        {type: "Fairy", color: "#f59dc3"},
        {type: "Ground", color: "#b59543"},
        {type: "Water", color: "#368ecd"},
        {type: "Ice", color: "#82dde2"},
        {type: "Fighting", color: "#953b1b"},
        {type: "Rock", color: "#a08b23"},
        {type: "Psychic", color: "#ef43ad"},
        {type: "Ghost", color: "#5a3f90"},
        {type: "Dragon", color: "#f15816"},
        {type: "Dark", color: "#3e3027"},
        {type: "Steel", color: "#a0a6a5"},
        {type: "Flying", color: "#569bae"}
    ];

        // loop through the pokemon.type array to create a span for each type.
    pokemon.type.forEach(type => {
        const typeSpan = document.createElement('span'); // Create a new span
        typeSpan.textContent = type; // Set its text from the type name
        typeSpan.classList.add("type"); // Add a class for styling

        // Set the background color for every type, regardless of how many there are types. 
        // It looks up the color in the typeColorArr based on the type name. If it doesn't find a match, it defaults to gray.
        typeSpan.style.backgroundColor = typeColorArr.find(t => t.type === type)?.color || "#878787";
        
        pokemonType.appendChild(typeSpan); // Add it to the pokemon-type container to order them in a row. 
        // If there are multiple types, they will be displayed side by side.
    });
    

    // Creating the elements doesn't automatically put them on the screen or connect them. appendChild is the glue.
    // First, it glues the index and the name inside the cardInfo container.
    cardInfo.appendChild(pokemonIndex);
    cardInfo.appendChild(pokemonName);
    

    // Create a div for the card's inner content with the class "card-inner" to hold the image and card info.
    // This is an additional wrapper that can be used for CARD REVERSE Animation.
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    card.appendChild(cardInner);

    // ... Function to Flip the card ...
    function flipCard(cardInner) {
        // If the card is already flipped, remove the flip class to flip it back.
        if (cardInner.classList.contains("flip")) {
            cardInner.classList.remove("flip");
            console.log("Card flipped back.");
        } else {
            // If the card is not flipped, add the flip class to flip it.
            cardInner.classList.add("flip");
            console.log("Card flipped.");

            // After 8 seconds, remove the flip class to flip the card back automatically.
            setTimeout(() => {
                cardInner.classList.remove("flip");
                console.log("Card flipped back after 8 seconds.");
            }, 8000);
        }
    }  // listeners now attached during card construction below
    // When a card is clicked, it toggles the "flip" class on the card's inner container, 
    // which triggers the CSS animation to flip the card and show the back side.


    // Create a div containers for CARD FRONT and CARD BACK information (for CARD REVERSE Animation).
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardInner.appendChild(cardFront);

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardInner.appendChild(cardBack);


      // ... 4. The Card Front Content: ...
    // Append the image and card info to the card inner FRONT container
    cardFront.appendChild(img);
    cardFront.appendChild(cardInfo);

    // Create buttons container for the front side of the card (extension: for battle and flip) and append it to the card front.
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("front-buttons");
    cardInfo.appendChild(buttonsContainer);


    // Create a button for flipping the card (on the front side)
    const flipButton = document.createElement("button");
    flipButton.textContent = "Profile";
    flipButton.classList.add("flip-btn"); // Add a class for flip buttons
    buttonsContainer.appendChild(flipButton);
    // attach click listener now that cardInner exists
    flipButton.addEventListener("click", () => {
        flipCard(cardInner);
        // change color animation on click
        flipButton.style.backgroundColor = "#0c4983";
        setTimeout(() => {
            flipButton.style.backgroundColor = "#2181dc";
        }, 1000);
    });
    
        // Create a button for battling (extension: for battle) on the front side
    const battleButton = document.createElement("button");
    battleButton.textContent = "Battle!";
    buttonsContainer.appendChild(battleButton);
    battleButton.addEventListener("click", () => {
        selectPokemonForBattle(pokemon);
    });
    // Battle Button Event Listeners. Each "Battle!" button now calls selectPokemonForBattle(pokemon)
    battleButton.addEventListener("click", () => {
        selectPokemonForBattle(pokemon);
        // change color animation on click
        flipButton.style.backgroundColor = "#0c4983";
        setTimeout(() => {
            flipButton.style.backgroundColor = "#2181dc";
        }, 1000);
    });


       // ... 5. The Card Back Content: ...
    // The CARD BACK can be used for additional information when the card is flipped.
    const backContent = document.createElement("div");
    backContent.classList.add("back-content");
    backContent.innerHTML = `<p>Additional information</p>`;
    cardBack.appendChild(backContent);

    cardBack.appendChild(pokemonType);
 
    // Container for Back Button and Name (on the back side)
    const backButtonNameContainer = document.createElement("div");
    backButtonNameContainer.classList.add("back-button-name");
    cardBack.appendChild(backButtonNameContainer);

    const pokemonTitle = document.createElement("h2");
    pokemonTitle.textContent = pokemon.name;
    backButtonNameContainer.appendChild(pokemonTitle);

    // Create a button for flipping-back the card (on the back side)
    const flipBackButton = document.createElement("button");
    flipBackButton.textContent = "Pokémon";
    flipBackButton.classList.add("flip-btn"); // Add a class for flip buttons
    backButtonNameContainer.appendChild(flipBackButton);
    flipBackButton.addEventListener("click", () => {
        flipCard(cardInner);
        // change color animation on click
        flipBackButton.style.backgroundColor = "#0c4983";
        setTimeout(() => {
            flipBackButton.style.backgroundColor = "#2181dc";
        }, 1000);
    });

    containerPokedex.appendChild(card);

    // After all the elements are created add the Pokémon's ID to the card li element
    card.id = formattedId;
}

// Initial rendering if you have a local array (optional)
if (typeof pokemonsArr !== 'undefined') {
    pokemonsArr.forEach(pokemon => {
        renderPokemonCard(pokemon);
    });
}


// ........... POKEDEX Search Filter (by name or id in the board)...................
const searchFilterBtn = document.getElementById("search-filter-btn");
const searchFilterInput = document.getElementById("search-filter-input");


if (searchFilterBtn && searchFilterInput) {
   searchFilterBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!searchFilterInput) {
        alert("Enter Pokemon name or id to search for!");
        searchFilterBtn.style.backgroundColor = "grey";
        setTimeout(() => {
        searchFilterBtn.style.backgroundColor = "white";
        }, 150);
        return;
    }
    
    // Get the user input from the search filter field
    // Remove any leading/trailing whitespace and convert to lowercase for case-insensitive matching
    const searchInput = searchFilterInput?.value?.trim().toLowerCase(); // query reads user input
    const searchNameInput = (searchInput) => {
        // If it starts with # or is just digits, it's an ID, not a name
        if (/^#?\d+$/.test(searchInput)) {
            return null;
        }

        // Otherwise assume it's a name, capitalize the first letter
        if (searchInput.length > 0) {
            return searchInput.charAt(0).toUpperCase() + searchInput.slice(1);
        }
        return null;
    };
    const searchIdInput = (searchInput) => {
        // If it starts with # and has 4 digits (total 5 chars), return as is
        if (/^#\d{4}$/.test(searchInput)) {
            return searchInput;
        }

        // Check for numeric input or starting with #
        if (/^#?\d+$/.test(searchInput)) {
            const digits = searchInput.replace("#", "");
            return `#${digits.padStart(4, "0")}`;
        }
        return null;
    };

    // 1. Prepare the search inputs for comparison
    // We already have 'searchInput' (lowercase) from earlier.
    const searchInputClean = searchInput.replace("#", ""); 

    // 2. Select all Pokemon cards currently on the board
    const allCards = containerPokedex.querySelectorAll(".card");

    // 3. Loop through every card to see if it matches
    allCards.forEach(card => {
        // Get the Name and ID from the card itself
        // Convert the card data to lowercase for easy comparison
        const cardName = card.querySelector(".pokemon-name")?.innerText.trim().toLowerCase();
        const cardId = card.id; // e.g., "0004"

        // Search Logic: Check if the name or ID includes the user's input
        const isMatch = (cardName && cardName.includes(searchInput)) || 
                        (cardId && cardId.includes(searchInputClean));

        // 4. Show if it's a match, hide if it's not
        if (isMatch || searchInput === "") {
            card.style.display = "block"; // Show
        } else {
            card.style.display = "none";  // Hide
        }
    });

    console.log(`Searching for: ${searchInput} (clean: ${searchInputClean})`);
}); 
}

