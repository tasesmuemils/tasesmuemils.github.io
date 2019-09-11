/*Script by Emils Bisenieks 2019 
Using fetch API*/

/*Collect necessary elements*/
const dropdown = document.querySelector('#coutriesList');
const countriesAPI = 'https://restcountries.eu/rest/v2/all';
const flagImage = document.querySelector('#flagImage');
const countryInfo = document.querySelector('#countryInfo');

/*IIFE*/
(function() {
    /* Fetch Data from countries API */
    fetch(countriesAPI)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            /*Adds countries names to dropdown list */
            for (let i = 0; i < data.length; i++) {
                const addOption = document.createElement('option');
                addOption.textContent = data[i].name;
                addOption.classList.add('countriesName');
                dropdown.appendChild(addOption);

                /*Adds change event listener to  dropdown list*/
                dropdown.addEventListener('change', function() {
                    var index = dropdown.selectedIndex - 1;
                    if(index === i) {
                        flagImage.innerHTML = `<img src="${data[index].flag}" alt="">`;
                        countryInfo.innerHTML = `
                            <p>Capital: ${data[index].capital}</p>
                            <p>Population: ${data[index].population}</p>
                            <p>Region: ${data[index].region}</p>
                            <p>Native name: ${data[index].nativeName}</p>
                        `
                    }
                })
            }
        })
}());
