console.log("script.js CONNECTED!");

// find the save button (it's only 1 so we use "querySelector()")
var saveButton = document.querySelector(".save-new-plan");

// find the input to get what the user typed
var textBox = document.querySelector("input");

// #1 find the parent for adding elements to it
var list = document.querySelector("ul");

// find initial delete buttons
var buttons = document.querySelectorAll("li > button");

// activate initial delete buttons
buttons.forEach(function (oneButton) {
  oneButton.onclick = function () {
    var item = oneButton.parentNode;
    item.remove();
  };
});

// add a "click" event handler (when the button is clicked call this function)
saveButton.onclick = function () {
  if (textBox.value === "") {
    // cancel the function if there is no text
    return;
  }

  // #2 create child element <li></li>
  var newItem = document.createElement("li");

  // #3 fill child with the content that the USER TYPED (input's value)
  newItem.innerHTML = textBox.value + " <button>Delete</button>";

  // #4 add new child to parent
  list.appendChild(newItem);

  // find the new delete button
  var newButton = newItem.querySelector("button");

  // activate the new delete button
  newButton.onclick = function () {
    newItem.remove();
  };

  // delete the text from the input (we already added the item)
  textBox.value = "";
};
