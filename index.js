let toDoList = readFromLocalStorage('toDoList');

window.addEventListener('load', updateApp);

document.addEventListener('click', manageClicks);

function manageClicks(e) {
    let element = e.target.closest('button');
    if (element === null) return;

    let action = element.getAttribute('data-action');

    console.log(action);

    if (action === 'reset') {
        toDoList = [];
        removeFromLocalStorage('toDoList');
    }
    if (action === 'add-item') {
        let toDoString = readUserInput();
        updateList(toDoString, toDoList);
        writeToLocalStorage('toDoList', toDoList);
    }
    if (action === 'delete-item') {
        let id = getItemId(element);
        deleteItemFromList(id, toDoList);
        writeToLocalStorage('toDoList', toDoList);
    }
    updateApp();
}


function getItemId(element) {
    return element.closest('.app__item').getAttribute('data-id');
}

function deleteItemFromList(id, list) {
    list.forEach(function(listItem, index) {
        if (listItem['id'] === id) {
            list.splice(index, 1);
        }
    })
}

function readUserInput() {
    let toDoString = document.querySelector('#to-do-text').value;
    return toDoString;
}

function updateList(string, list) {
    let obj = { 'title': string };
    obj['date'] = new Date();
    obj['status'] = 'undone';

    let id = (Math.floor(Math.random() * 1000000000000000)).toString();
    obj['id'] = id;
    list.push(obj);

}




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
    return JSON.parse(window.localStorage.getItem(key)) || [];
}

function renderList(list) {
    let contentElement = document.querySelector('.app__content')
    contentElement.innerHTML = '';

    if (list && list !== []) {
        list.forEach(item => {
            // document.querySelector('.app__content').append(toDoElement(item.title, item.date, item.status));
            document.querySelector('.app__content').innerHTML +=
                `
                <div class="app__item" data-id="${item.id}">
                    <div class="title">
                        ${item.title}
                    </div>
                    <div class="date">
                        ${item.date}
                    </div>
                    <div class="status">
                        ${item.status}
                    </div>
                    <div class="done">
                        <button type="button" data-action="set-item-status">Item done</button>
                    </div>
                    <div class="delete">
                        <button type="button" data-action="delete-item">Delete item</button>
                    </div>
                </div>
                `
        });
    }
}


function toDoElement(title, date, status) {
    // let element = createElement('div', 'app__item', '');
    // element.append(createElement('div', 'title', title));
    // element.append(createElement('div', 'date', date));
    // element.append(createElement('div', 'status', status));

    // element.append(createElement('button', 'delete', "Delete"));

    return element;
}

function createElement(which, cssClass, innerHTML) {
    let element = document.createElement(which);
    element.classList.add(cssClass);
    element.innerHTML = innerHTML;
    return element;
}