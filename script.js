function addTask() {
    var input = document.getElementById("taskInput");
    var timeInput = document.getElementById("taskTime");
    var taskText = input.value;
    var taskTime = timeInput.value;
    if (taskText.trim() === "" || taskTime === "") {
        alert("Please enter a task and choose a time!");
        return;
    }
    var ul = document.getElementById("taskList");
    var li = document.createElement("li");
    li.innerHTML = '<input type="checkbox" onclick="toggleTask(this)">' +
                    '<span class="task">' + taskText + '</span>' +
                    '<span class="task-time"> at ' + taskTime + '</span>' +
                    '<button onclick="editTask(this)">Edit</button>' +
                    '<button onclick="deleteTask(this)">Delete</button>';
    ul.appendChild(li);
    // Set timer for the task
    setTaskTimer(taskText, taskTime);
    input.value = "";
    timeInput.value = "";
}

// Add task on Enter key press
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

document.getElementById("taskTime").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function deleteTask(button) {
    var li = button.parentElement;
    li.remove();
    // Clear timer for the deleted task
    clearTaskTimer(li.querySelector('.task').textContent);
}

function editTask(button) {
    var li = button.parentElement;
    var taskText = li.querySelector('.task');
    var taskTime = li.querySelector('.task-time');
    
    var newText = prompt("Edit task:", taskText.textContent);
    var newTime = prompt("Edit time:", taskTime.textContent.split(" at ")[1]);

    if (newText !== null && newTime !== null) {
        taskText.textContent = newText;
        taskTime.textContent = " at " + newTime;
        // Update timer for the task
        updateTaskTimer(taskText.textContent, newTime);
    }
}

function updateTaskTimer(taskText, taskTime) {
    // Clear previous timer for the task
    clearTaskTimer(taskText);
    // Set timer for the task with the updated time
    setTaskTimer(taskText, taskTime);
}

function setTaskTimer(taskText, taskTime) {
    var timeParts = taskTime.split(':');
    var taskDate = new Date();
    taskDate.setHours(parseInt(timeParts[0]));
    taskDate.setMinutes(parseInt(timeParts[1]));
    
    var now = new Date();
    var timeUntilTask = taskDate - now;
    
    if (timeUntilTask > 0) {
        setTimeout(function() {
            alert("Reminder: " + taskText + " - It's time to do your task!");
        }, timeUntilTask);
    }
}

function clearTaskTimer(taskText) {
    // Clear timer for the deleted task
    // Implement logic here to clear the timer associated with the task
}

function toggleTask(checkbox) {
    var taskText = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskText.style.textDecoration = "line-through";
    } else {
        taskText.style.textDecoration = "none";
    }
}
