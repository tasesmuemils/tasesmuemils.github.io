//This will be JS code for my TODO list.
//I will try few things with this:
/* 1. ADD ITEM
    2. Remove ITEM
    3. Edit ITEM */

var firstInput = document.getElementById('firstInput');
var toDoList = document.getElementById('toDo');
var inputArray = [];


//ADD ITEM
function addItem() {

    //Adds first input as first in array
    inputArray.unshift(firstInput.value);
    firstInput.value = '';
    var toDoItem = document.createElement('li');
    var toDoEdit = document.createElement('INPUT');
    toDoEdit.value = inputArray[0];
    toDoEdit.disabled = true;

    //Array and list index are ===
    if (toDoList.childElementCount = 0) {
        toDoList.appendChild(toDoItem);
    } else {
        toDoList.insertBefore(toDoItem, toDoList.firstChild);
    }
    toDoItem.appendChild(toDoEdit);

    //Delete button
    var deleteItem = document.createElement('button');
    deleteItem.textContent = 'Delete';
    deleteItem.type = 'button';
    deleteItem.setAttribute('class', 'deleteItem');
    toDoItem.appendChild(deleteItem);

    //Edit button
    var editItem = document.createElement('button');
    editItem.type = 'button';
    editItem.textContent = 'Edit';
    editItem.setAttribute('class', 'editItem');
    toDoItem.appendChild(editItem);


    //DELETE ITEM
    function deleteToDoItem() {
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i] === toDoEdit.value) {
                inputArray.splice(i, 1);
            }
        }
        toDoList.removeChild(toDoItem);
    }
    //DELETE ITEM END


    //EDIT ITEM
    var clickState = 0;

    function editToDoItem() {
        if (clickState === 0) {
            toDoEdit.disabled = false;
            editItem.textContent = 'Close Edit';
            toDoEdit.type = 'text';
            toDoEdit.focus();
            clickState = 1;
        } else {
            for (let i = 0; i < inputArray.length; i++) {
                if (inputArray[i] != toDoList.childNodes[i].firstChild.value) {
                    inputArray[i] = toDoList.childNodes[i].firstChild.value;   
                }
            }
            editItem.textContent = 'Edit';
            toDoEdit.disabled = true;
            clickState = 0;
        }
    }
    //EDIT ITEM END

    //DELETE AND EDIT BUTTON ACTION
    deleteItem.addEventListener('click', deleteToDoItem, false);
    editItem.addEventListener('click', editToDoItem, false);
}

//ADD ITEM BUTTON ACTION
var addItemButton = document.getElementById('addItemButton');
addItemButton.addEventListener('click', addItem, false);
