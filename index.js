window.addEventListener('load', initApp());

let toDoList = [{
    "title": "test to do item",
    "date": "2022-06-23",
    "status": "done"
}]



function initApp() {
    let toDoList = readFromLocalStorage('toDoList');

    toDoList ? console.log(toDoList) : console.log('nothing to do!');
}

function writeToLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

function resetLocalStorage(key) {
    window.localStorage.setItem(key, JSON.stringify([]));
}

function readFromLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
}