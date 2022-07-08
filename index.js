window.addEventListener('load', function() {
    // let toDoList = readFromLocalStorage('toDoList');

    let toDoList = [{
        'title': 'task title 1',
        'date': 'task date 1',
        'status': 'task status 1',
        'labelList': ['label 1', 'label 2']
    }, {
        'title': 'task title 2',
        'date': 'task date 2',
        'status': 'task status 2',
        'labelList': ['label 3', 'label 4']
    }, ]

    renderApp('.app__content', toDoList);
});

// document.addEventListener('click', manageClicks);

/**
 * Render the list to the DOM
 * @param {String} element The element to use as DOM container
 * @param {Array} list The list to render into DOM container
 */
function renderApp(element, list) {
    let elementToRenderListInto = document.querySelector(element);

    if (!elementToRenderListInto || !list) return;

    elementToRenderListInto.innerHTML = renderList(list);

}



let renderList = list => {

    if (list.length === 0) {
        return `
        <div class="app__message">Nothing to to!</div>
        `
    }

    let labelTemplate = (string, item) => {
        return string + `
            
            <span class="task__label">${item}</span>
                `
    }

    let taskTemplate = (string, item) => {

        return string + ` 
        <div class="task" data-id="${item.id}">
                <div class="task__title">
                    ${item.title}
                </div>
                <div class="task__date">
                    ${item.date}
                </div>
                <div class="task__status">
                    ${item.status}
                </div>
                <div class="task__labels">
                    ${item.labelList.reduce(labelTemplate, '')}
                </div>
                <div class="task__done">
                    <button type="button" data-action="set-item-status">Task done</button>
                </div>
                <div class="task__delete">
                    <button type="button" data-action="delete-item">Delete task</button>
                </div>
            </div>
                `
    };

    return list.reduce(taskTemplate, '');

}


// function manageClicks(e) {
//     let element = e.target.closest('button');
//     if (element === null) return;

//     let action = element.getAttribute('data-action');

//     console.log(action);

//     if (action === 'reset') {
//         toDoList = [];
//         removeFromLocalStorage('toDoList');
//     }
//     if (action === 'add-item') {
//         let toDoString = readUserInput();
//         updateList(toDoString, toDoList);
//         writeToLocalStorage('toDoList', toDoList);
//     }
//     if (action === 'delete-item') {
//         let id = getItemId(element);
//         deleteItemFromList(id, toDoList);
//         writeToLocalStorage('toDoList', toDoList);
//     }
//     renderApp();
// }


// function getItemId(element) {
//     return element.closest('.app__item').getAttribute('data-id');
// }

// function deleteItemFromList(id, list) {
//     list.forEach(function(listItem, index) {
//         if (listItem['id'] === id) {
//             list.splice(index, 1);
//         }
//     })
// }

// function readUserInput() {
//     let toDoString = document.querySelector('#to-do-text').value;
//     return toDoString;
// }

// function updateList(string, list) {
//     let obj = { 'title': string };
//     obj['date'] = new Date();
//     obj['status'] = 'undone';

//     let id = (Math.floor(Math.random() * 1000000000000000)).toString();
//     obj['id'] = id;
//     list.push(obj);

// }



// function writeToLocalStorage(key, value) {
//     window.localStorage.setItem(key, JSON.stringify(value));
// }

// function removeFromLocalStorage(key) {
//     window.localStorage.removeItem(key);
// }

// let readFromLocalStorage = (key) => {
//     return JSON.parse(window.localStorage.getItem(key)) || [];
// }



// function toDoElement(title, date, status) {
//     // let element = createElement('div', 'app__item', '');
//     // element.append(createElement('div', 'title', title));
//     // element.append(createElement('div', 'date', date));
//     // element.append(createElement('div', 'status', status));

//     // element.append(createElement('button', 'delete', "Delete"));

//     return element;
// }

// function createElement(which, cssClass, innerHTML) {
//     let element = document.createElement(which);
//     element.classList.add(cssClass);
//     element.innerHTML = innerHTML;
//     return element;
// }