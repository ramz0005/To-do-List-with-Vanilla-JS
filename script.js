const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('total-count');
const allFilter = document.getElementById('all-filter');
const completedFilter = document.getElementById('completed-filter');
const pendingFilter = document.getElementById('pending-filter');

let totalTasks = 0;

// Function to add a new task
function addTask(task) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', toggleTask);
  const span = document.createElement('span');
  span.classList.add('task');
  span.innerText = task;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', deleteTask);
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
  totalTasks++;
  taskCount.innerText = totalTasks;
  todoInput.value = '';
  updateFiltersDisplay();
}

// Function to toggle the completed state of a task
function toggleTask() {
  const task = this.nextElementSibling;
  if (this.checked) {
    task.classList.add('checked');
  } else {
    task.classList.remove('checked');
  }
  updateFiltersDisplay();
}

// Function to delete a task
function deleteTask() {
  this.parentElement.remove();
  totalTasks--;
  taskCount.innerText = totalTasks;
  updateFiltersDisplay();
}

// Function to update the display of filter buttons
function updateFiltersDisplay() {
  const allTasks = todoList.querySelectorAll('li');
  const completedTasks = todoList.querySelectorAll('.checked');

  allFilter.innerText = `All (${allTasks.length})`;
  completedFilter.innerText = `Completed (${completedTasks.length})`;
  pendingFilter.innerText = `Pending (${allTasks.length - completedTasks.length})`;

  const currentFilter = document.querySelector('.active-filter');
  if (currentFilter) {
    currentFilter.classList.remove('active-filter');
  }
}

// Function to filter tasks
function filterTasks(filter) {
  const tasks = todoList.querySelectorAll('li');
  tasks.forEach(task => {
    switch (filter) {
      case 'all':
        task.style.display = 'flex';
        break;
      case 'completed':
        if (task.querySelector('input').checked) {
          task.style.display = 'flex';
        } else {
          task.style.display = 'none';
        }
        break;
      case 'pending':
        if (!task.querySelector('input').checked) {
          task.style.display = 'flex';
        } else {
          task.style.display = 'none';
        }
        break;
    }
  });
}

// Event listeners for filter buttons
allFilter.addEventListener('click', () => {
  filterTasks('all');
  allFilter.classList.add('active-filter');
});
completedFilter.addEventListener('click', () => {
  filterTasks('completed');
  completedFilter.classList.add('active-filter');
});
pendingFilter.addEventListener('click', () => {
  filterTasks('pending');
  pendingFilter.classList.add('active-filter');
});

// Event listener for form submission
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task !== '') {
    addTask(task);
  }
});
