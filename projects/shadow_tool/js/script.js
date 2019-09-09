/*Vanilla JS script for Shadow-Box generator
Created by Emils Bisenieks (inspired from Wes Bos JS30 )*/

//Capture necessary elements
const sliderInputs = document.querySelectorAll(".result");
const textInputs = document.querySelectorAll('input[type="text"]');
const copyCSS = document.getElementById('copyCSScode');

//Change NodeLists to Arrays
const sliderArray = Array.from(sliderInputs);
const arrayText = Array.from(textInputs);

//ConvertS hex to rgb, so opacity on shadow is available (from StackOverflow)
function hex2rgb(hex) {
    r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (r) {
        return r.slice(1, 4).map(function (x) {
            return parseInt(x, 16);
        });
    }
}

function handleSliderUpdate() {
    for (let i = 0; i < sliderArray.length; i++) {
        //Suffix will get attributes value. New way can be .dataset (this.dataset.sizing)
        const suffix = sliderArray[i].getAttribute('data-sizing') || '';

        //If input type === 'range', add suffix, else = no suffix added
        if (sliderArray[i].type === 'range') {
            document.documentElement.style.setProperty(`--${sliderArray[i].name}`, sliderArray[i].value + suffix);
            sliderArray[i].previousElementSibling.lastElementChild.firstElementChild.value = sliderArray[i].value;
        } else {
            document.documentElement.style.setProperty(`--${sliderArray[i].name}`, hex2rgb(sliderArray[i].value).toString());
            sliderArray[i].nextElementSibling.value = sliderArray[i].value;
        }
    }

    //Copy CSS text for user
    copyCSS.textContent = `box-shadow: ${sliderArray[0].value}xp ${sliderArray[1].value}px ${sliderArray[2].value}px ${sliderArray[3].value}px rgba(${hex2rgb(sliderArray[4].value).toString()}, ${sliderArray[7].value});`
}

//ADDS EVENT TO ALL INPUTS
for (let i = 0; i < sliderArray.length; i++) {

    //Fires function if mouse move over slider
    sliderArray[i].addEventListener('mousemove', function () {
        handleSliderUpdate();
    });

    //On slider change
    sliderArray[i].addEventListener('change', function () {
        handleSliderUpdate();
    });

    //For slider values
    arrayText[i].addEventListener('change', function () {
        const sliderValueUpdate = this.parentElement.parentElement.nextElementSibling;
        if ((this.classList.contains('pixelsInput') && this.value != sliderValueUpdate.value)) {
            sliderValueUpdate.value = this.value;
            handleSliderUpdate();
        }
    });

    //For colors
    arrayText[i].addEventListener('change', function () {
        const colorValueUpdate = this.previousElementSibling;
        if (this.classList.contains('colorInput') && this.value != colorValueUpdate.value) {
            colorValueUpdate.value = this.value;
            handleSliderUpdate();
        }
    })
}
