
let toDoList = [
    {
        "title": "test to do item",
        "date": "2022-06-23",
        "status": "done"
    }
]



const test = () => { console.log('hi') };
test();

let temp = JSON.stringify(toDoList);
console.log(`Stringified object: ${temp}`)

window.localStorage.setItem('toDoList', temp);

let tempBack = window.localStorage.getItem('toDoList');
console.log(`Stringified object from localStorage: ${tempBack}`)

tempBack = JSON.parse(toDoList);
console.log(tempBack)