function _id(id){
    return document.getElementById(id);
}

function _class(className){
    return document.getElementsByClassName(className);
}

const inputTodo = _id('todo');
const inputSearch = _id('search');
const todoGallery = _id('todo-gallery');
const addButton = _id('add-btn');
const searchButton = _id('search-btn');

addButton.addEventListener('click', addTodo);
searchButton.addEventListener('click', searchTodo);

function toggleButton(id){
    _id(`button-wrapper-${id}`).classList.toggle('active')
}

const todoList = [];
let counter = 0;

function addTodo(){
    const todo = inputTodo.value;
    if(todo.length === 0){
        return;
    }
    const todoObj = {
        'id' : counter,
        'title': todo,
        'checked' : false
    }
    todoList.push(todoObj);
    counter++;
    updateGallery();
}

function searchTodo(){
    const searchString = inputSearch.value;
    const filteredList = [];
    todoList.forEach((todo) => {
        if(todo.title.toLowerCase().includes(searchString.toLowerCase())){
            filteredList.push(todo);
        }
    });
    updateGallery(filteredList);
}

function updateGallery(list = todoList){
    todoGallery.innerHTML = ""
    list.forEach(function(todo, index){
        const todoCard = document.createElement('div');
        todoCard.className = "todo-card"
        todoCard.id = `card-${todo.id}`
        todoCard.innerHTML = `
            <div class="todo" id="bg-${todo.id}" readonly>
                <input type="checkbox" class="todo-checkbox" id="check-${todo.id}" onchange="setChecked(${todo.id}, this.checked)">
                <input type="text" class="todo-title" id="title-${todo.id}" value="${todo.title}" readonly>
                <div class="option-btn" onclick="toggleButton(${todo.id})">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
            <div class="button-wrapper" id="button-wrapper-${todo.id}">
                <i class="fa-solid fa-pen" onclick="updateTodo(${todo.id})"></i>

                <i class="fa-solid fa-clone" onclick="dupTodo()"></i>

                <i class="fa-solid fa-trash" onclick="removeTodo(${todo.id})"></i>
            </div>
        `
        todoGallery.append(todoCard);
    })
}

function setChecked(id, checked){
    todoList.forEach(function(todo){
        if(todo.id === id){
            todo.checked = checked;
        }
    })
    _id(`title-${id}`).classList.toggle('strikethrough');
    _id(`bg-${id}`).classList.toggle('strikethrough');
}

function updateTodo(id){
    const titleField = _id(`title-${id}`);
    titleField.readOnly = false;
    titleField.focus();
    titleField.onkeydown = function(e){
        if(e.key === "Enter"){
            todoList.forEach(function(todo){
                if(todo.id === id){
                    todo.title = titleField.value;
                }
            })
            titleField.readOnly = true;
            this.onkeydown = null;
        }
    }
}

function removeTodo(id){
    index = todoList.find((todo) => todo.id == id)
    const removed = todoList.splice(index, 1)
    _id(`card-${id}`).remove();
}

const cloneTodo = _class('todo-title');
function dupTodo(){

    const cloneX = cloneTodo.value;

    const todoObj = {
        'id' : counter,
        'title': cloneX,
        'checked' : false
    }

    const node = addTodo();
    const clone = node.cloneNode(true);
    todoGallery.appendChild(dupTodo());
}