/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...
const cardContainer = document.getElementsByClassName("cardsContainer")[0];
console.log(Array.from(cardContainer.children));

// apply red background to previously selected elements upon browser refresh..
Array.from(cardContainer.children).forEach((item) => {
  if (localStorage.getItem("favorites").includes(item.id)) {
    item.classList.add("red");
  }
});

const setBackground = (elem) => {
  if (!Array.from(elem.classList).includes("red")) {
    elem.classList.add("red");
  } else {
    elem.classList.remove("red");
  }
};

const removeFromFavs = (id) => {
  const itemToDelete = id;
  const storageArr = localStorage.getItem("favorites").split(",");
  storageArr.splice(storageArr.indexOf(itemToDelete), 1);
  const updatedMyListValue = storageArr.join(",");

  return localStorage.setItem("favorites", updatedMyListValue);
};

const addOrRemove = (id) => {
  if (localStorage.getItem("favorites") == null) {
    return localStorage.setItem("favorites", `${id}`);
  } else if (!localStorage.getItem("favorites").includes(id)) {
    const newItems = id;
    let storageData = localStorage.getItem("favorites");
    storageData += `,${newItems}`;
    return localStorage.setItem("favorites", storageData);
  } else {
    return removeFromFavs(id);
  }
};

const callbackFn = (e) => {
  const id = e.target.id;
  addOrRemove(id);
  if (!Array.from(e.target.classList).includes("cardsContainer")) {
    setBackground(e.target);
  }
};

cardContainer.addEventListener("click", callbackFn);
