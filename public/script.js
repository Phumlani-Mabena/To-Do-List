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
document.addEventListener("DOMContentLoaded", () => {
    getLocalTodos(); // Load stored todos when the page loads
    restoreFilterState(); // Restore and apply the saved filter state
});
todoButton.addEventListener("click", addTodo); // Add a new todo when the button is clicked
todoList.addEventListener("click", deleteCheck); // Handle delete, complete, and edit actions
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

    // Create a button for editing the todo
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

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

// Function to handle delete, complete, and edit actions
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

    // If the edit button is clicked, allow editing the todo
    if (item.classList[0] === "edit-btn") {
        const todo = item.parentElement;
        const todoText = todo.querySelector(".todo-item");
        const currentText = todoText.innerText;

        // Create an input field for editing
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = currentText;
        editInput.classList.add("edit-input");

        // Replace the todo text with the input field
        todo.replaceChild(editInput, todoText);

        // Focus on the input field and select the current text
        editInput.focus();
        editInput.setSelectionRange(0, editInput.value.length);

        // Handle saving the edited todo
        editInput.addEventListener("blur", function () {
            const updatedText = editInput.value.trim();
            if (updatedText) {
                todoText.innerText = updatedText;
                todo.replaceChild(todoText, editInput);
                updateLocalTodoText(todo, updatedText); // Update local storage
            } else {
                alert("Todo cannot be empty!");
                editInput.focus();
            }
        });

        // Save on pressing Enter
        editInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                editInput.blur(); // Trigger the blur event to save
            }
        });
    }
}

// Function to save the current filter state to local storage
function saveFilterState(filter) {
    localStorage.setItem("filter", filter);
}

// Function to restore the filter state on page load
function restoreFilterState() {
    const savedFilter = localStorage.getItem("filter") || "all"; // Default to "all" if no filter is saved
    filterOption.value = savedFilter; // Set the filter dropdown to the saved state
    filterTodo({ target: { value: savedFilter } }); // Apply the saved filter
}

// Modify the filterTodo function to save the filter state
function filterTodo(e) {
    const selectedFilter = e.target.value; // Get the selected filter
    saveFilterState(selectedFilter); // Save the selected filter to local storage
    applyFilter(selectedFilter); // Apply the filter
}

// Function to apply the filter based on the given value
function applyFilter(filter) {
    const todos = todoList.childNodes; // Get all child nodes of the list
    todos.forEach(function (todo) {
        if (todo.nodeType === 1) { // Ensure it's an element node
            switch (filter) {
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

        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add("edit-btn");
        todoDiv.appendChild(editButton);

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
    const todoIndex = Array.from(todoList.children).indexOf(todo); // Find the index of the todo
    todos[todoIndex].completed = todo.classList.contains("completed"); // Update the status
    localStorage.setItem("todos", JSON.stringify(todos)); // Save back to local storage
}

// Function to update a todo's text in local storage
function updateLocalTodoText(todo, updatedText) {
    let todos = JSON.parse(localStorage.getItem("todos")) || []; // Get existing todos
    const todoIndex = Array.from(todoList.children).indexOf(todo); // Find the index of the todo
    todos[todoIndex].text = updatedText; // Update the text
    localStorage.setItem("todos", JSON.stringify(todos)); // Save back to local storage
}

// Remove a todo from local storage
function removeLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || []; // Get existing todos
    const todoIndex = Array.from(todoList.children).indexOf(todo); // Find the index of the todo
    todos.splice(todoIndex, 1); // Remove the todo at the index
    localStorage.setItem("todos", JSON.stringify(todos)); // Save back to local storage
}
