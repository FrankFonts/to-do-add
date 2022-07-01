window.addEventListener('load', initApp());

let toDoList = [{
    "title": "test to do item",
    "date": "2022-06-23",
    "status": "done"
}, {
    "title": "another to do item",
    "date": "2022-06-29",
    "status": "undone"
}]



function initApp() {
    let toDoList = readFromLocalStorage('toDoList');
    (toDoList && toDoList !== []) ? renderList(toDoList): renderMessage('Nothing to do');
}

function writeToLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

function removeFromLocalStorage(key) {
    window.localStorage.removeItem(key);
}

function readFromLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

function renderList(list) {
    list.forEach(item => {
        // console.log(item);
        document.querySelector('.app__message').append(toDoElement(item.title, item.date, item.status));
    });
}

function renderMessage(message) {
    document.querySelector('.app__message').innerHTML = message;
}

function toDoElement(title, date, status) {
    let element = createElement('div', 'item', '');
    element.append(createElement('div', 'title', title));
    element.append(createElement('div', 'date', date));
    element.append(createElement('div', 'status', status));

    return element;
}

function createElement(which, cssClass, innerHTML) {
    let element = document.createElement(which);
    element.classList.add(cssClass);
    element.innerHTML = innerHTML;
    return element;
}