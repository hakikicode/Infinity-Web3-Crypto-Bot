document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
    document.getElementById('taskForm').addEventListener('submit', handleTaskFormSubmit);
});

// Fetch all tasks from the backend
async function fetchTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    renderTaskList(tasks);
}

// Render tasks in the dashboard for editing
function renderTaskList(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '<h3>Current Tasks</h3>';

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        
        taskItem.innerHTML = `
            <h4>${task.name}</h4>
            <p>Points: ${task.points}</p>
            <p>Type: ${task.type}</p>
            <button onclick="editTask('${task._id}')">Edit</button>
            <button onclick="deleteTask('${task._id}')">Delete</button>
        `;

        taskList.appendChild(taskItem);
    });
}

// Handle form submission for adding or updating a task
async function handleTaskFormSubmit(event) {
    event.preventDefault();

    const taskData = {
        name: document.getElementById('taskName').value,
        url: document.getElementById('taskUrl').value,
        points: parseInt(document.getElementById('taskPoints').value),
        type: document.getElementById('taskType').value,
    };

    let response;
    if (taskData._id) {
        response = await fetch(`/tasks/${taskData._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });
    } else {
        response = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });
    }

    if (response.ok) {
        alert('Task saved successfully!');
        fetchTasks();
        clearForm();
    } else {
        alert('Failed to save task.');
    }
}

// Edit a task
async function editTask(taskId) {
    const response = await fetch(`/api/tasks/${taskId}`);
    const task = await response.json();

    document.getElementById('taskName').value = task.name;
    document.getElementById('taskUrl').value = task.url;
    document.getElementById('taskPoints').value = task.points;
    document.getElementById('taskType').value = task.type;
    document.getElementById('taskForm').setAttribute('data-task-id', task._id);
}

// Delete a task
async function deleteTask(taskId) {
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (confirmed) {
        const response = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Task deleted successfully!');
            fetchTasks();
        } else {
            alert('Failed to delete task.');
        }
    }
}

// Clear the form after submission or update
function clearForm() {
    document.getElementById('taskName').value = '';
    document.getElementById('taskUrl').value = '';
    document.getElementById('taskPoints').value = '';
    document.getElementById('taskType').value = '';
    document.getElementById('taskForm').removeAttribute('data-task-id');
}
