// Select the input, button, and list elements from the DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Select elements for task counts
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const incompleteTasks = document.getElementById("incomplete-tasks");

// Event listeners for various user interactions
document.addEventListener("DOMContentLoaded", getLocalTodos); // Load stored todos when the page loads
todoButton.addEventListener("click", addTodo); // Add a new todo when the button is clicked
todoList.addEventListener("click", deleteCheck); // Handle delete and complete actions
filterOption.addEventListener("change", filterTodo); // Filter todos based on selection

// Function to update task counts
function updateTaskCounts() {
    const todos = todoList.children; // Get all todo items
    let completedCount = 0;
    let incompleteCount = 0;

    Array.from(todos).forEach(todo => {
        if (todo.classList.contains("completed")) {
            completedCount++;
        } else {
            incompleteCount++;
        }
    });

    // Update counts in the DOM
    totalTasks.textContent = todos.length;
    completedTasks.textContent = completedCount;
    incompleteTasks.textContent = incompleteCount;
}

// Function to add a new todo item
function addTodo(event) {
    event.preventDefault(); // Prevent form submission

    // Validate input: Check if the input is empty or contains only whitespace
    if (todoInput.value.trim() === "") {
        alert("Please enter a valid todo!"); // Notify the user
        todoInput.value = ""; // Clear the input field
        return; // Exit the function if validation fails
    }

    // Create a div for the todo item
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create an <li> element for the todo text
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Save the new todo to local storage
    saveLocalTodos({ text: todoInput.value, completed: false });

    // Create a button for marking the todo as completed
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Create a button for deleting the todo
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Add the todo item to the list
    todoList.insertBefore(todoDiv, todoList.firstChild);


    // Clear the input field
    todoInput.value = "";

    // Update task counts
    updateTaskCounts();
}

// Function to handle delete and complete actions
function deleteCheck(e) {
    const item = e.target;

    // If the trash button is clicked, delete the todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("slide"); // Add animation class
        removeLocalTodos(todo); // Remove from local storage
        todo.addEventListener("transitionend", function () {
            todo.remove(); // Remove from the DOM after animation
            updateTaskCounts(); // Update task counts after deletion
        });
    }

    // If the complete button is clicked, toggle the completed status
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        updateLocalTodoStatus(todo); // Update the status in local storage
        updateTaskCounts(); // Update task counts after toggling completion
    }
}

// Function to filter todos based on their status
function filterTodo(e) {
    const todos = todoList.childNodes; // Get all child nodes of the list
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"; // Show all todos
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex"; // Show completed todos
                } else {
                    todo.style.display = "none"; // Hide incomplete todos
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex"; // Show incomplete todos
                } else {
                    todo.style.display = "none"; // Hide completed todos
                }
                break;
        }
    });
}

// Save a new todo to local storage
function saveLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || []; // Get existing todos or initialize
    todos.unshift(todo); // Add the new todo at the beginning
    localStorage.setItem("todos", JSON.stringify(todos)); // Save back to local storage
}

// Load todos from local storage when the page loads
function getLocalTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || []; // Get existing todos
    todos.forEach(function (todo) {
        // Create the todo item in the DOM
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        if (todo.completed) {
            todoDiv.classList.add("completed"); // Add completed class if necessary
        }

        const newTodo = document.createElement("li");
        newTodo.innerText = todo.text; // Set the todo text
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv); // Add the todo to the list
    });

    // Update task counts after loading todos
    updateTaskCounts();
}

// Update the completion status of a todo in local storage
function updateLocalTodoStatus(todo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || []; // Get existing todos
    const todoIndex = Array.from(todoList.children).indexOf(todo); // Fid the index of the todo
    todos[todoIndex].completed = todo.classList.contains("completed"); // Update its status
    localStorage.setItem("todos", JSON.stringify(todos)); // Save back to local storage
}

// Remove a todo from local storage
function removeLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || []; // Get existing todos
    const todoIndex = Array.from(todoList.children).indexOf(todo); // Find the index of the todo
    todos.splice(todoIndex, 1); // Remove it from the array
    localStorage.setItem("todos", JSON.stringify(todos)); // Save back to local storage
}
