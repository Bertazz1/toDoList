let tasks = [];

function addTask() {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');

    const taskValue = taskInput.value.trim();
    const priorityValue = prioritySelect.value;

    if (taskValue) {
        const task = {
            id: Date.now(),
            name: taskValue,
            priority: priorityValue,
            completed: false
        };
        tasks.push(task);
        taskInput.value = '';
        displayTasks(tasks);
    } else {
        alert("Insira o nome da tarefa.");
    }
}

function displayTasks(taskArray) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    taskArray.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.priority}`;
        li.setAttribute('data-id', task.id);

        const taskName = document.createElement('span');
        taskName.textContent = task.name;

        const taskActions = document.createElement('div');
        taskActions.className = "task-actions";

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editTask(task.id);
        editButton.className = 'edit'


        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Incompleta' : 'Concluir';
        completeButton.onclick = function () {
            modal.style.display = "block";
        }
        var modal = document.getElementById("myModal")
        var close = document.getElementsByClassName("close")[0];
        close.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        modalCompleteButton.onclick= function (event) {
            removeTask(task.id);
            modal.style.display = "none";
        }
        completeButton.className = 'complete'


        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancelar';
        cancelButton.onclick = () => removeTask(task.id);
        cancelButton.className = 'cancel'

        taskActions.append(editButton, completeButton, cancelButton);

        li.append(taskName, taskActions);
        taskList.appendChild(li);
    });
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newTaskName = prompt('Editar tarefa:', task.name);
    if (newTaskName !== null) {
        task.name = newTaskName;
        displayTasks(tasks);
    }
}

function removeTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    displayTasks(tasks);
}

function searchTasks() {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchValue));
    displayTasks(filteredTasks);
}
