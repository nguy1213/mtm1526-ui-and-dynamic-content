
// Save the reference to text-field into a variable
let groceryInput = document.getElementById("grocery_input");

// Save the reference to new-item button into a variable
let addItemButton = document.getElementById("add_item_button");

// Save the reference to save-list button into a variable
let saveListButton = document.getElementById("save_list_button");

// Save the reference to ordered list into a variable
let groceryList = document.getElementById("grocery_list");

// Save the reference to paragraph for feedback
let feedbackMessage = document.getElementById("feedback_message");


// Creates one new list item with text and delete button
function createListItem(itemText) {

    let newListItem = document.createElement("li");

    let listItemRow = document.createElement("div");

    listItemRow.className = "list_item_row";

    let listItemText = document.createElement("span");

    listItemText.className = "list_item_text";

    // Put the user text inside the span
    listItemText.textContent = itemText;

    // Create delete button
    let deleteItemButton = document.createElement("button");

    deleteItemButton.className = "delete_item_button";

    deleteItemButton.type = "button";

    deleteItemButton.setAttribute("aria-label", "Delete this item");

    // Delete icon inside button
    deleteItemButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    // Click event for deleting the item
    deleteItemButton.addEventListener("click", function () {
        newListItem.remove();
        saveListAutomatically();
        feedbackMessage.textContent = "Item deleted. We respect your snack decisions.";
        feedbackMessage.style.color = "#58733D";
    });

    listItemRow.appendChild(listItemText);
    listItemRow.appendChild(deleteItemButton);

    newListItem.appendChild(listItemRow);

    return newListItem;
}

// ADD ITEM FUNCTION 
function addItem() {

    let inputValue = groceryInput.value.trim();

    // Check if user entered the value in input text-field
    if (inputValue !== "") {

        let newListItem = createListItem(inputValue);

        groceryList.appendChild(newListItem);

        feedbackMessage.textContent = "Added to the list. Backpack energy restored.";
        feedbackMessage.style.color = "#58733D";

        groceryInput.value = "";

        groceryInput.focus();

        saveListAutomatically();

    } else {

        // Print message if nothing is entered
        feedbackMessage.textContent = "Nothing entered. Even the tote bag is empty.";
        feedbackMessage.style.color = "#BF3124";

        // Put the cursor back to text-field
        groceryInput.focus();
    }
}


// SAVE ALL LIST ITEMS FUNCTION BEGINS HERE
function saveListAutomatically() {

    let allItems = [];

    let listItemTexts = document.querySelectorAll(".list_item_text");

    for (let i = 0; i < listItemTexts.length; i++) {
        allItems.push(listItemTexts[i].textContent);
    }

    localStorage.setItem("backpackMarketList", JSON.stringify(allItems));
}


// SAVE BUTTON FUNCTION BEGINS HERE
function saveList() {

    let listItemTexts = document.querySelectorAll(".list_item_text");

    if (listItemTexts.length > 0) {
        saveListAutomatically();
        feedbackMessage.textContent = "List saved. Your future trip just got less chaotic.";
        feedbackMessage.style.color = "#58733D";
    } else {
        feedbackMessage.textContent = "Nothing to save yet. Even the tote bag is empty.";
        feedbackMessage.style.color = "#BF3124";
    }
}


// LOAD LIST ON PAGE LOAD BEGINS HERE
function loadSavedList() {

    let savedList = localStorage.getItem("backpackMarketList");

    if (savedList !== null) {

        let savedItemsArray = JSON.parse(savedList);

        for (let i = 0; i < savedItemsArray.length; i++) {

            let savedListItem = createListItem(savedItemsArray[i]);

            groceryList.appendChild(savedListItem);
        }
    }
}


// Register addItem for click event on button
addItemButton.addEventListener("click", addItem);


// Register saveList function for click event on save button
saveListButton.addEventListener("click", saveList);


// Allow user to press Enter key to add item
groceryInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addItem();
    }
});

loadSavedList();