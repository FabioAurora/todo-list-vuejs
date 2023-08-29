# todo-list-vuejs

> A  toDo list app built with VueJS, Vuex &amp; Tailwind CSS

## Live Demo
https://fabioaurora.github.io/todo-list-vuejs/
## Table of Contents

- [Usage](#usage)
- [Getting Started](#getting-started)
- [CRUD Features](#crud-features)
- [Technologies Used](#technologies-used)


## Usage
1. To add a task you can add a name to the task and a due date, add  the task by clicking Add button or by pressing enter key.
2. User can edit each task by double clicking on the task or by clicking on the edit button.
3. Mark tasks as completed by checking the checkbox (text will be red if overdue).
4. Delete tasks by clicking trash/bin icon, this will activate a pop up to confirm deletion.
5. Can view different task lists by clicking the button at the bottom, can view All, Pending or completed tasks.
6. Can clear completed tasks by clicking the clear completed button.

## Getting Started
1. Clone or fork the repository: `https://github.com/FabioAurora/todo-list-vuejs.git`
2. Navigate to the project directory: `cd todo-list-vuejs`
3. Install dependencies: `npm install`
4. Start the development server: `npm run serve`
5. App will run at `http://localhost:8080/` (or another port if indicated).

## Technologies Used
- Vuejs 2
- Vuex for state management
- tailwind CSS for styling
- Javascript (ES6+)
- -Unit and component testing

## CRUD Features
* [x] Option to create To Do task.
* [x] Option to Update To Do task.
* [x] Option to Delete To Do task(confirmation modal / pop-up).
* [x] Option to View all To Do tasks (only pending).

## Other Features
* [X] Mark task as complete.
* [x] Duplicate the task.
* [x] Set due date for the task.
* [X] Option to view all the completed tasks.
* [x] Task if past due date and not marked as complete (highlight task in red).
* [ ] demonstrate.

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
