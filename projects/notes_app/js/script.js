//Capture necessery elements
const openModalButton = document.querySelector('.openModal');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modalContent');
const createNote = document.querySelector('.createNote');
const listOfNotes = document.querySelector('.notesList');
const closeModalButton = document.querySelector('.closeModalButton');



//Function to get zeros before date and month if string value consists only form one value
const todaysDate = new Date();
if (todaysDate.getMonth().toString().split('').length === 1) {
    var month = '0' + (todaysDate.getMonth() + 1);
} else if (todaysDate.getDate().toString().split('').length === 1) {
    var date = '0' + todaysDate.getDate();
};

const dateMsg = todaysDate.getDate() + '.' + month + '.' + todaysDate.getFullYear();

//Create an empty array where values will be stored
//If there are something in local storage (in this case - objects),
//It will appear on page, if local storage is empty - array is empty 
const notesArray = JSON.parse(localStorage.getItem('notesArray')) || [];

//Opens modal
function notesModal(e) {
    e.preventDefault();
    modal.style.display = 'flex';
    modalContent.firstElementChild.nextElementSibling.lastElementChild.value = '';
    modalContent.lastElementChild.previousElementSibling.lastElementChild.value = '';
}

//close modal
function closeModal() {
    modal.style.display = 'none';
}


function createNoteCard() {
    //Store input fields values
    let cardsTitle = modalContent.firstElementChild.nextElementSibling.lastElementChild.value;
    let cardsText = modalContent.lastElementChild.previousElementSibling.lastElementChild.value;

    //Creates an object with stored values
    let itemObject = {
        title: cardsTitle,
        text: cardsText
    }

    //Push object to array

    notesArray.push(itemObject);
    updateCardsList(notesArray, listOfNotes);
    localStorage.setItem('notesArray', JSON.stringify(notesArray));


    //Hide modal
    modal.style.display = 'none';
}


//Adds content to page (in this case it takes array with objects and elemnt in witch content will apear)
function updateCardsList(items, itemsList) {
    //New card content (The map() method calls the provided function once for each element in an array, in order.)
    //It will take every item form array and create content for page, where array content will apear
    itemsList.innerHTML = items.map(function (item, i) {
        return `
        <div class='card'>
            <h1><input type='text' data-index=${i} class='cardsTitle' value='${item.title}'</h1>
            <p><textarea type='text' data-index=${i} class='cardsText' cols="30" rows="6" value=''>${item.text}</textarea></p>
            <p>${i + 1}</p>
            <p>${dateMsg}</p>
            <button type='button' data-index=${i} class='deleteButton'>DELETE</button>
        </div>
        `;
    }).join(''); //.join() by default will add ' , ', this will join them togather
    editContent();
}


openModalButton.addEventListener('click', notesModal);
closeModalButton.addEventListener('click', closeModal);
createNote.addEventListener('click', createNoteCard);

//Updates page content everytime when refresh happens
updateCardsList(notesArray, listOfNotes);

//when focus out (blur) from cards editable input, captures new value and updates array and localStorage with new value
function editContent() {
    const cardsHTMLCollection = document.getElementsByClassName('card');
    const cards = [...cardsHTMLCollection];
    cards.forEach(element => {
        let titleText = element.querySelector('.cardsTitle');
        let descriptionText = element.querySelector('.cardsText');
        let deleteButton = element.querySelector('.deleteButton');

        //updates title
        function titleUpdate(e) {
            let target = e.target;
            let i = target.dataset.index;
            if (titleText.value != notesArray[i].title) {
                notesArray[i].title = titleText.value;
                localStorage.setItem('notesArray', JSON.stringify(notesArray));
            }
        }

        //updates description
        function descriptionUpdate(e) {
            let target = e.target;
            let i = target.dataset.index;
            if (descriptionText.value != notesArray[i].text) {
                notesArray[i].text = descriptionText.value;
                localStorage.setItem('notesArray', JSON.stringify(notesArray));
            }
        }

        //delete card
        function deleteCard(e) {
            let target = e.target;
            let i = target.dataset.index;
            notesArray.splice(i, 1);
            localStorage.setItem('notesArray', JSON.stringify(notesArray));
            element.parentNode.removeChild(element);
        }

        //adds event listener on blur
        titleText.addEventListener('blur', titleUpdate);
        descriptionText.addEventListener('blur', descriptionUpdate);
        deleteButton.addEventListener('click', deleteCard)
    });
}
