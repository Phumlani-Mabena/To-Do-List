To-Do List App

Overview

This To-Do List App is a simple, user-friendly web application designed to help users keep track of their tasks. It allows users to add, delete, and mark tasks as complete, with a summary of task statistics. The app persists data using localStorage, ensuring tasks remain even after a page refresh.

Features

Add Tasks: Users can add new tasks to the list. The most recently added task appears at the top.

Mark as Completed: Tasks can be marked as completed and toggled back to incomplete.

Delete Tasks: Tasks can be deleted from the list.

Filter Tasks: Users can filter tasks to show all, completed, or incomplete tasks.

Task Summary: A summary is displayed showing the total number of tasks, completed tasks, and incomplete tasks.

Data Persistence: Tasks are saved in localStorage and are loaded automatically when the page is refreshed.

Technology Stack

HTML: Structure of the web app.

CSS: Styling the app, ensuring it is visually appealing and responsive.

JavaScript: Interactivity and logic for task management and data persistence.

Setup Instructions

Clone the repository or download the files.

Open the index.html file in your preferred web browser.

Start using the app by adding, managing, and filtering tasks.

Code Structure

Files:

index.html: Contains the structure of the app.

styles.css: Styles the app with a clean and modern design.

script.js: Handles the functionality and logic of the app.

Key Functions in script.js:

addTodo: Adds a new task to the list and saves it to localStorage.

deleteCheck: Handles deleting tasks and toggling their completed state.

filterTodo: Filters tasks based on user selection (all, completed, or incomplete).

saveLocalTodos: Saves tasks to localStorage.

getLocalTodos: Loads tasks from localStorage and displays them.

updateLocalTodoStatus: Updates the completion status of a task in localStorage.

removeLocalTodos: Deletes a task from localStorage.

How to Use

Add a Task: Enter a task in the input field and click the "+" button.

Mark as Complete: Click the check icon next to a task to mark it as completed.

Delete a Task: Click the trash icon next to a task to delete it.

Filter Tasks: Use the dropdown menu to filter tasks by their status.

Task Summary: View the task summary at the bottom of the container.

Screenshot

Include a screenshot or gif demonstrating the app (optional).

Future Enhancements

Add a dark mode for better accessibility.

Enable editing of tasks.

Integrate backend storage for multi-device syncing.

License

This project is open-source and available under the MIT License.

Author: [Your Name]Date: January 2025

