window.addEventListener('load', updateApp);

document.addEventListener('click', manageClicks);

function manageClicks(e) {
    let element = e.target.closest('button');
    if (element === null) return;

    let action = element.getAttribute('data-action');

    if (action === 'reset') {
        toDoList = [];
        removeFromLocalStorage('toDoList');
    }
    if (action === 'add-item') {
        let toDoString = readData();
        updateList(toDoString);
        writeToLocalStorage('toDoList', toDoList);
    }
    updateApp();
}

function readData() {
    let toDoString = document.querySelector('#to-do-text').value;
    console.log(toDoString);
    return toDoString;

}

function updateList(string) {
    let obj = { 'title': string };
    obj['date'] = new Date();
    obj['status'] = 'undone';
    toDoList.push(obj);
}

let toDoList = [{
    "title": "test to do item",
    "date": "2022-06-23",
    "status": "done"
}, {
    "title": "another to do item",
    "date": "2022-06-29",
    "status": "undone"
}]



function updateApp() {
    let toDoList = readFromLocalStorage('toDoList');
    let message = document.querySelector('.app__message');

    renderList(toDoList);

    if (toDoList) {
        message.classList.add('hidden');
    } else {
        message.classList.remove('hidden');
    }
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
    let contentElement = document.querySelector('.app__content')
    contentElement.innerHTML = '';

    if (list && list !== []) {
        list.forEach(item => {
            document.querySelector('.app__content').append(toDoElement(item.title, item.date, item.status));
        });
    }
}


function toDoElement(title, date, status) {
    let element = createElement('div', 'app__item', '');
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