let todoItemsContainerEl = document.getElementById("todoItemsContainer");
let addTodoButtonEl = document.getElementById("addTodoButton");



let todoList = [
    {
        text : "Learn HTML",
        uniqueNo : 1,
    },
    {
        text : "Learn CSS",
        uniqueNo : 2,
    },
    {
        text : "Learn JavaScript",
        uniqueNo : 3
    }
]

function onTodoStatusChange(checkboxId, labelId){
    let checkboxElement = document.getElementById(checkboxId);
    let labelIdElement = document.getElementById(labelId);
     
    
    labelIdElement.classList.toggle("checked");
}







function onDeleteTodo(todoId){
    let todoIdElement = document.getElementById(todoId);
    todoItemsContainerEl.removeChild(todoIdElement);

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
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId,labelId);

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
    };

    createAndAppendTodo(newTodo);
    userInputEl.value="";
    

}






addTodoButtonEl.onclick = function(){
    onAddTodo();
}