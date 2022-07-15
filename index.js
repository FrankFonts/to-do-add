let appElement = document.querySelector('app');

let tasks = [];

window.addEventListener('load', setup());

window.addEventListener('click', manageClicks);





function setup() {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTaskList();
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateApp() {
    updateLocalStorage();
    renderTaskList();
}

function addNewTask() {
    let userInput = document.querySelector('#user-input').value;

    if (!userInput) return;

    tasks.unshift({
        'title': userInput,
        'status': 'undone'
    })
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => {
        if (task.title !== taskId) {
            return task;
        }
    })
}

function toggleTaskStatus(index) {
    if (tasks[index]['status'] === 'undone') {
        tasks[index]['status'] = 'done';
    } else {
        tasks[index]['status'] = 'undone';
    }
}

function manageClicks(e) {
    if (e.target.getAttribute('data-action') === 'add-new-task') {
        addNewTask();
        updateApp();
    };
    if (e.target.getAttribute('data-action') === 'delete-task') {
        deleteTask(e.target.getAttribute('data-task'));
        updateApp();
    };
    if (e.target.getAttribute('data-action') === 'toggle-task-status') {
        toggleTaskStatus(e.target.getAttribute('data-index'));
        updateApp();
    };

}

function renderTaskList() {
    let template = `
        <div class="list__controls">
            <input type="text" id="user-input" class="list__input">
            <button data-action="add-new-task" class="list__input">Add new task</button>
        </div>
    `;

    let index = 0;

    for (let task of tasks) {
        template += `
            <div class="task task--${task.status}">
                <div>
                    ${task.title}
                </div>
                <div>
                    <button class="toggle-task-status" data-action="toggle-task-status" data-index="${index}"></button>
                    <button data-action="delete-task" data-task="${task.title}">Delete</button>
                </div>
            </div>
        `
        index++;
    }

    template = `<div class="list"> ${template} </div>`;


    appElement.innerHTML = template;
}


// class ToDoApp {
//     constructor() {
//         this.lists = {};
//     }

//     addList(listID) {
//         this.lists[listID] = new taskList(listID);
//     }

//     addTask(listID, taskID) {
//         this.lists[listID]['taskList'].push(new task(taskID));
//     }

//     renderAllLists(element) {
//         let temp = '';
//         for (const list in this.lists) {
//             temp += `
// $ { JSON.stringify(this.lists[list]) } < br > `;
//         }
//         element.innerHTML = temp;
//     }

//     returnList(listID) {
//         return this.lists[listID]['taskList'].reduce((template, task) => template + task['taskId']);
//     }

//     returnTaskTemplate(template, task) {
//         console.log(task);
//         return template + task['taskId'];
//     }
// }


// class taskList {
//     constructor(listID) {
//         this.listID = listID;
//         this.taskList = [];
//     }
// }
// class task {
//     constructor(taskID) {
//         this.taskID = taskID;
//         this.status = 'to do';
//         let date = Date.now();
//         this.date = date;
//     }
// }

// const toDoApp = new ToDoApp();

// toDoApp.addList('first list');
// toDoApp.addTask('first list', 'first task');
// toDoApp.addTask('first list', 'second task');

// toDoApp.addList('second list');
// toDoApp.addTask('second list', 'first task');
// toDoApp.addTask('second list', 'second task');


// const element = document.querySelector('app');
// element.innerHTML = toDoApp.returnList('first list');





// //
// //
// // test 

// console.log(toDoApp);


// // let listFirst = [
// //     // list item
// //     {
// //         'listID': 'First Tasklist',
// //         'taskList': [{
// //             'id': '000000000001',
// //             'title': 'task title 1',
// //             'date': 'task date 1',
// //             'status': 'task status 1',
// //             'labelList': ['label 1', 'label 2']
// //         }, {
// //             'id': '000000000002',
// //             'title': 'task title 2',
// //             'date': 'task date 2',
// //             'status': 'task status 2',
// //             'labelList': ['label 3', 'label 4']
// //         }, {
// //             'id': '000000000003',
// //             'title': 'task title 3',
// //             'date': 'task date 3',
// //             'status': 'task status 3',
// //             'labelList': ['label 5', 'label 6']
// //         }]
// //     },

// // ]

// // window.addEventListener("load", function() {

// //     let apps = document.querySelectorAll('app');

// //     console.log(apps, 'hello');

// //     if (!apps) return;

// //     apps.forEach(element => renderApp(element));

// // });

// // document.addEventListener('click', manageButtonClicks);

// // /**
// //  * Render the list to the DOM
// //  * @param {String} element The element to use as DOM container
// //  * @param {Array} list The list to render into DOM container
// //  */
// // let renderApp = (element) => {
// //     let elementToRenderListInto = element;

// //     let listToRender = elementToRenderListInto.getAttribute('data-render');

// //     console.log(listToRender);

// //     elementToRenderListInto.innerHTML = '';

// //     listToRender.forEach(thisList => {
// //         elementToRenderListInto.innerHTML += renderList(thisList);
// //     })

// // }

// // /**
// //  * Compile and return an HTML template from a list
// //  * @param {Array} list The list of task objects
// //  * @return {String} The HTML string
// //  */
// // let renderList = list => {

// //     // if (list['taskList'].length === 0) {
// //     //     return `
// //     //     <div class="app__message">Nothing to to!</div>
// //     //     `
// //     // }

// //     let labelTemplate = (string, item) => {
// //         return string + `
// //             <span class="task__label">${item}</span>
// //                 `
// //     }

// //     let taskTemplate = (string, item) => {

// //         return string + ` 
// //         <div class="task" data-id="${item.id}">
// //                 <div class="task__title">
// //                     ${item.title}
// //                 </div>
// //                 <div class="task__date">
// //                     ${item.date}
// //                 </div>
// //                 <div class="task__status">
// //                     ${item.status}
// //                 </div>
// //                 <div class="task__labels">
// //                     ${item.labelList.reduce(labelTemplate, '')}
// //                 </div>
// //                 <div class="task__done">
// //                     <button type="button" data-action="set-task-status">Task done</button>
// //                 </div>
// //                 <div class="task__delete">
// //                     <button type="button" data-action="delete-task">Delete task</button>
// //                 </div>
// //             </div>
// //                 `
// //     };

// //     let appTemplate = (listId, string) => {
// //         return `

// //             <div class="list__title">
// //                 <h2>${listId}<h2>
// //             </div>
// //             <div class="app__controls">
// //                 <input type="text" value="Add a to do" id="to-do-text">
// //                 <button type="button" data-action="add-task">Add new task</button>
// //             </div>
// //             <div class="app__content">${string}</div>
// //             <div class="app__controls">
// //                 <button type="button" data-action="delete-all-tasks">Delete all tasks</button>
// //             </div>
// //         `
// //     }

// //     return appTemplate(list.listID, list.taskList.reduce(taskTemplate, ''));

// // }

// // /**
// //  * Sort buttons and run code according to their function 
// //  * @param {*} event The click event
// //  */
// // function manageButtonClicks(event) {
// //     let button = event.target.closest('button');

// //     if (!button) return;

// //     if (button) {
// //         let action = button.getAttribute('data-action');

// //         console.log(action);

// //         if (action === 'add-task') {}

// //         if (action === 'delete-task') {}

// //         if (action === 'set-task-status') {}

// //         if (action === 'delete-all-tasks') {
// //             listFirst[0]['taskList'] = [];
// //             console.log(listFirst);
// //         }

// //         renderApp('app', listFirst);
// //     }

// //     //     if (action === 'reset') {
// //     //         toDoList = [];
// //     //         removeFromLocalStorage('toDoList');
// //     //     }
// //     //     if (action === 'add-item') {
// //     //         let toDoString = readUserInput();
// //     //         updateList(toDoString, toDoList);
// //     //         writeToLocalStorage('toDoList', toDoList);
// //     //     }
// //     //     if (action === 'delete-item') {
// //     //         let id = getItemId(element);
// //     //         deleteItemFromList(id, toDoList);
// //     //         writeToLocalStorage('toDoList', toDoList);
// //     //     }
// //     //     renderApp();
// // }


// // // function getItemId(element) {
// // //     return element.closest('.app__item').getAttribute('data-id');
// // // }

// // // function deleteItemFromList(id, list) {
// // //     list.forEach(function(listItem, index) {
// // //         if (listItem['id'] === id) {
// // //             list.splice(index, 1);
// // //         }
// // //     })
// // // }

// // // function readUserInput() {
// // //     let toDoString = document.querySelector('#to-do-text').value;
// // //     return toDoString;
// // // }

// // // function updateList(string, list) {
// // //     let obj = { 'title': string };
// // //     obj['date'] = new Date();
// // //     obj['status'] = 'undone';

// // //     let id = (Math.floor(Math.random() * 1000000000000000)).toString();
// // //     obj['id'] = id;
// // //     list.push(obj);

// // // }



// // // function writeToLocalStorage(key, value) {
// // //     window.localStorage.setItem(key, JSON.stringify(value));
// // // }

// // // function removeFromLocalStorage(key) {
// // //     window.localStorage.removeItem(key);
// // // }

// // // let readFromLocalStorage = (key) => {
// // //     return JSON.parse(window.localStorage.getItem(key)) || [];
// // // }