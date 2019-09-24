/*Pokemon app by Emils Bisesnieks 2019
Data: PokeAPI
First time creating filters, sorting, searching with Vanilla JS*/


//PAGE LOUDER
window.addEventListener('load', () => {
    const preload = document.querySelector('.page-loader-wrapper');

    //Array for introduction texts
    const pokemonFacts = [
        "Rhydon was the first Pokemon ever created",
        "Hitmonchan and Hitmonlee got their names from famous fighters",
        "Clefairy was almost the face of pokemon (instead of Pikachu)",
        "The franchise has made more than 39 billion dollars and sold over 200 million copies"
    ]

    /*Takes random item from array and updates HTML*/
    const pokemonFact = document.getElementById("randomFact");
    const pokemonFactsItem = pokemonFacts[Math.floor(Math.random() * pokemonFacts.length)];
    console.log(pokemonFactsItem);
    pokemonFact.textContent = pokemonFactsItem;
    setTimeout(() => {
        preload.classList.add('loader-finish');
    }, 3000);

})
//PAGE LOUDER END


//API DATA
const pokemonList = document.getElementById('pokemonList'); //List Ul
const apiURL = 'https://pokeapi.co/api/v2/pokemon/'; //API URL
const promises = []; //Empty array to collect promises

/*Gets data from API, sets data in HTML.
IFEE */
(function () {

    //Loop threw every pokemon url and get promise of it
    for (let i = 1; i < 152; i++) {
        promises.push(fetch(apiURL + i) //Puts every promise in emopty array
            .then(function (response) {
                return response.json();
            }))
    }

    //Gets data from API
    Promise.all(promises).then(function (data) {
        for (i = 0; i < data.length; i++) { //Loops threw every promise on collects information

            //li image section
            const listItem = document.createElement('li'); //Creates pokemon card (li)
            const listItemFigure = document.createElement('figure'); //Creates pokemon cards figure element
            const pokeImage = document.createElement('img'); //Creates pokemon cards img element
            const pokeImgSrc = data[i].sprites["front_default"]; //Gets image from data array
            pokeImage.src = pokeImgSrc; //Sets image to img element
            pokeImage.classList.add('pokemon-img'); //Adds class to image
            listItemFigure.appendChild(pokeImage); //Adds img to figure
            listItem.appendChild(listItemFigure); //Adds figure to li

            //li description section
            const listItemInfo = document.createElement('div'); //Creates description div
            listItemInfo.classList.add('pokemon-description'); //Adds class to div
            const pokeName = data[i].name; //Adds name form data array
            listItemInfo.innerHTML = `
                        <h6><span>#</span>${data[i].id}</h6>
                        <h5 class="pokemon-name">${pokeName}</h5>
                    `; //Applys data to HTML 

            listItem.appendChild(listItemInfo); //Adds description div to li
            pokemonList.appendChild(listItem); //Adds description li to ul


            //This loops threw types and if there is one, adds element to the page
            //Also, checks name and givs background color to that element
            const pokeTypes = document.createElement('div');
            pokeTypes.classList.add('pokemon-types');
            listItemInfo.appendChild(pokeTypes);

            for (let z = 0; z < data[i].types.length; z++) {
                const pokeType = document.createElement('h6');
                pokeType.classList.add('pokemon-type', "poke-type");
                pokeType.textContent = data[i].types[z].type.name;
                pokeTypes.appendChild(pokeType);
                listItemInfo.appendChild(pokeTypes);

                const switchValue = pokeType.textContent;
                switch (switchValue) {
                    case 'grass':
                        pokeType.style.backgroundColor = '#9bcc50';
                        break;

                    case 'poison':
                        pokeType.style.backgroundColor = '#b97fc9';
                        break;

                    case 'fire':
                        pokeType.style.backgroundColor = '#fd7d24';
                        break;

                    case 'flying':
                        pokeType.style.background = 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)';
                        pokeType.style.backgroundColor = '#3dc7ef';
                        break;

                    case 'water':
                        pokeType.style.backgroundColor = '#4592c4';
                        break;

                    case 'ice':
                        pokeType.style.backgroundColor = '#51c4e7';
                        break;

                    case 'bug':
                        pokeType.style.backgroundColor = '#729f3f';
                        break;

                    case 'normal':
                        pokeType.style.backgroundColor = '#a4acaf';
                        break;

                    case 'electric':
                        pokeType.style.backgroundColor = '#eed535';
                        break;

                    case 'ground':
                        pokeType.style.background = 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)';
                        pokeType.style.backgroundColor = '#f7de3f';
                        break;

                    case 'fairy':
                        pokeType.style.backgroundColor = '#fdb9e9';
                        break;

                    case 'fighting':
                        pokeType.style.backgroundColor = '#d56723';
                        break;

                    case 'psychic':
                        pokeType.style.backgroundColor = '#f366b9';
                        break;

                    case 'steel':
                        pokeType.style.backgroundColor = '#9eb7b8';
                        break;

                    case 'ghost':
                        pokeType.style.backgroundColor = '#7b62a3';
                        break;

                    case 'dragon':
                        pokeType.style.background = 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)';
                        pokeType.style.backgroundColor = '#53a4cf';
                        break;

                    case 'rock':
                        pokeType.style.backgroundColor = '#a38c21';
                        break;
                }
            }

            //CARDS MODAL
            //Gets data for modal card
            const pokeExperience = data[i].base_experience;
            const pokeHeight = data[i].height;
            const pokeWeight = data[i].weight;

            //Converter for weight and height
            function numberConvert(number) {
                if (number.toString().length === 1) {
                    return "0." + number;
                } else {
                    const numberString = number.toString();
                    const lastChar = numberString[numberString.length - 1];

                    if ((numberString.length > 2) && (number % lastChar) !== 0) {
                        return number / Math.pow(10, 1);
                    } else {
                        return number / 10;
                    }
                }
            }

            const modalWrapper = document.getElementById('modal'); //Gets modal from HTML

            //Adds modal content to HTML
            const pokeAbilities = document.createElement('div'); //Creates abilities modal div
            pokeAbilities.classList.add('pokemon-ablities'); //Adds class to abilities div

            for (let x = 0; x < data[i].abilities.length; x++) {
                const pokeAbility = document.createElement('h6'); //Creates element h6
                pokeAbility.classList.add('poke-ability'); //Adss class to element
                pokeAbility.textContent = data[i].abilities[x].ability.name; //Gets ability from data array
                pokeAbilities.appendChild(pokeAbility); //Appends h6 to abilities section
            }

            function openModal() { //Function runs when user click on cards image
                modalWrapper.innerHTML = `
                    <div class="modal-content">
                        <figure>
                            <img src="${pokeImgSrc}" alt="">
                        </figure>                  
                        <h5 class="poke-name">${pokeName}</h5>
                        <section class="poke-stats">
                            <p>Base Experience: <span>${pokeExperience} XP</span></p>
                            <p>Height: <span>${numberConvert(pokeHeight)} m</span></p>
                            <p>Weight: <span>${numberConvert(pokeWeight)} kg</span></p>
                        </section>
                        <section class="poke-types">
                            <h5>Pokemon Type</h5>
                            ${pokeTypes.innerHTML}
                        </section>
                        <section class="poke-abilities">
                            <h5>Abilities</h5>
                            ${pokeAbilities.innerHTML}
                        </section>
                        <div class="closeModalButton">
                            <button id="modalClose">close</button>
                        </div>
                    </div>
                `;
                modalWrapper.style.visibility = 'visible'; //CSS changes
                modalWrapper.style.opacity = 1; //CSS changes
                modalWrapper.style.transform = "scale(1)"; //CSS changes
                const modalClose = document.getElementById("modalClose"); //Close button
                modalClose.addEventListener("click", function () { //Function runs when user click on close button
                    modalWrapper.style.visibility = 'hidden'; //CSS changes
                    modalWrapper.style.opacity = 0; //CSS changes
                    modalWrapper.style.transform = "scale(2)"; //CSS changes
                })
            }
            pokeImage.addEventListener('click', openModal);
            //Cards modal end
        }
    })
}());
//API DAT END


//SEARCH
const searchResult = document.getElementById('searchBar'); //Gets search bar form HTML

function filterNames() {
    //Search value, list items, pokemon names
    const filterValue = searchResult.value.toLowerCase(); //Gets search value
    const pokemonListLi = pokemonList.querySelectorAll('li'); //Gets list items
    const pokemonListNames = pokemonList.querySelectorAll('.pokemon-name'); //Gets pokemon names

    for (let i = 0; i < pokemonListNames.length; i++) {
        /*if at least one value of search appears in name, list item stays
        if value of search never occurs, list item is hidden*/
        if (pokemonListNames[i].textContent.toLowerCase().indexOf(filterValue) > -1) {
            pokemonListLi[i].style.display = '';
        } else {
            pokemonListLi[i].style.display = 'none';
        }
    }
}
searchResult.addEventListener('keyup', filterNames);
//SEARCH END


//SORT
const sortOptions = document.getElementById('sortOptions');

function sorting() {
    const arraySortNode = document.querySelectorAll('li'); //Selects all list items
    arraySort = [...arraySortNode]; //convert NodeList to Array

    //Sort by pokemon name and #id
    arraySort.sort(function (a, b) {
        //A-Z
        if (sortOptions.selectedIndex === 1) {
            //Works on Firefox
            if (a.lastElementChild.firstElementChild.nextElementSibling.textContent > b.lastElementChild.firstElementChild.nextElementSibling.textContent) {
                return 1;
            //Works on Chrome    
            } else if (a.lastElementChild.firstElementChild.nextElementSibling.textContent < b.lastElementChild.firstElementChild.nextElementSibling.textContent) {
                return -1;
            }
            //Z-A
        } else if (sortOptions.selectedIndex === 2) {
            //Works on Firefox
            if (a.lastElementChild.firstElementChild.nextElementSibling.textContent < b.lastElementChild.firstElementChild.nextElementSibling.textContent) {
                return 1;
            //Works on Chrome
            } else if (a.lastElementChild.firstElementChild.nextElementSibling.textContent > b.lastElementChild.firstElementChild.nextElementSibling.textContent) {
                return -1;
            }
            //Lowest number (first)
        } else if (sortOptions.selectedIndex === 3) {
            return parseInt(a.lastElementChild.firstElementChild.lastChild.textContent) - parseInt(b.lastElementChild.firstElementChild.lastChild.textContent);
            //Highest number (first)
        } else if (sortOptions.selectedIndex === 4) {
            return parseInt(b.lastElementChild.firstElementChild.lastChild.textContent) - parseInt(a.lastElementChild.firstElementChild.lastChild.textContent);
        }
    });

    console.log(arraySort);

    //Applays li from array to HTML ul
    pokemonList.innerHTML = '';
    for (let i = 0; i < arraySort.length; i++) {
        pokemonList.appendChild(arraySort[i]);
    }
}

sortOptions.addEventListener('change', sorting);
//SORT END


//FILTER
//Get filter buttons array
const filterButtonsNode = document.querySelectorAll('.filterButton'); //Selects all filter buttons
const filterButtonsArray = [...filterButtonsNode]; //Converts NodeList to Array


function filterType() {
    const filterButtonText = this.textContent.toLowerCase(); //Takes text value from filter button
    const liFilterNodeList = document.querySelectorAll('li'); //Selects all list items
    const liFilterArray = [...liFilterNodeList]; //Converts NodeList to Array

    function filterTypes(type) {
        const typesNodeList = type.querySelectorAll('.pokemon-type');
        const typesArray = [...typesNodeList];

        //Function stops and returns full array
        if (filterButtonText === "all") {
            return typesArray;
        }

        //If button text = type text then filter works
        for (let i = 0; i < typesArray.length; i++) {
            if (typesArray[i].textContent == filterButtonText) {
                return typesArray[i];
            }
        }
    }

    let results = [];
    results = liFilterArray.filter(filterTypes); //Adds filtered values to empty array

    //Function compares filtered items to full array and leaves items which are ===
    function compare(arr1, arr2) {
        arr1.forEach(function (a1) {
            a1.style.display = 'none';
            arr2.forEach(function (a2) {
                if (a1 === a2) {
                    a1.style.display = '';
                }
            })
        })
    }

    compare(liFilterArray, results);
}

filterButtonsArray.forEach(function (filterButton) { //For each button adds event listener
    filterButton.addEventListener('click', filterType); 
})
//FILTER END

