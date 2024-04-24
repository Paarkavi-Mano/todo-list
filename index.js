let todoItemsContainerEl = document.getElementById("todoItemsContainer");
let addTodoButtonEl = document.getElementById("addTodoButton");
let saveButtonEl = document.getElementById("saveButton");



let todoList = getTodoListFromLocalStorage();

function onTodoStatusChange(checkboxId, labelId, todoId){
    let checkboxElement = document.getElementById(checkboxId);
    let labelIdElement = document.getElementById(labelId);
     
    
    labelIdElement.classList.toggle("checked");

    let todoItemIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }else{
            return false;
        }
    })
    
     let todoObject = todoList[todoItemIndex];
     
     if(todoObject.isChecked === true){
        todoObject.isChecked = false;
     }
     else{
        todoObject.isChecked = true;
     }

}


function onDeleteTodo(todoId){
    let todoIdElement = document.getElementById(todoId);
    todoItemsContainerEl.removeChild(todoIdElement);

    let deleteItemIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }else{
            return false;
        }

    })
    todoList.splice(deleteItemIndex, 1);
}


let todoCount = todoList.length;


function createAndAppendTodo(todo){

    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;


    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container");
    todoElement.id = todoId;
    todoItemsContainerEl.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type="checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId,labelId, todoId);

    }

    inputElement.classList.add("checkbox-input")
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id=labelId;
    
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    
    if(todo.isChecked === true){
        labelElement.classList.add("checked");
    }




    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid" , "fa-trash-can", "delete-icon");
    deleteIcon.onclick = function(){
        onDeleteTodo(todoId);
    }
    labelContainer.appendChild(deleteIcon);


}


for (let todo of todoList){
    createAndAppendTodo(todo);
}


function onAddTodo(){
    let userInputEl = document.getElementById("todoUserInput");
    let userInputValue = userInputEl.value;
    todoCount = todoCount + 1;

    if(userInputValue === ""){
        alert("Enter Valid Text");
        return;
        
    }

 let newTodo = {
        text:userInputValue,
        uniqueNo:todoCount,
        isChecked:false
    };

    createAndAppendTodo(newTodo);
    userInputEl.value="";
    todoList.push(newTodo);

}

addTodoButtonEl.onclick = function(){
    onAddTodo();
}


function onSaveTodo(){
    localStorage.setItem("todoList", JSON.stringify(todoList));
}






saveButtonEl.onclick = function(){
    onSaveTodo();
}

function getTodoListFromLocalStorage(){
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if(parsedTodoList === null){
        return []
    }
    else{
        return parsedTodoList;
    }
}


localStorage.removeItem("todoList");