const lightModeBtn = document.querySelector('.light-mode-btn');
const body = document.querySelector('.body');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const main = document.querySelector('.main');
const statistics = document.querySelector('.statistics');

const input = document.querySelector('.add-input');
const todoList = document.querySelector('.todo-list');

const navAllTasks = document.querySelector('.all');
const navActiveTasks = document.querySelector('.active');
const navCompletedTasks = document.querySelector('.completed');

const info = document.querySelector('.info');
const deleteAllBtn = document.querySelector('.delete-all-btn');

const statsActive = document.querySelector('.active-tasks');
const statsComplete = document.querySelector('.completed-tasks');

const tasksCollection = document.getElementsByClassName('todo');

let taskCount = 0;
let activeTasks = 0;
let completedTasks = 0;

const changeLightMode = () => {
	body.classList.toggle('body-dark');
	header.classList.toggle('header-dark');
	nav.classList.toggle('nav-dark');
	main.classList.toggle('main-dark');
	statistics.classList.toggle('statistics-dark');
};

const clearInput = () => {
	input.value = '';
	input.classList.remove('add-input-error');
	input.setAttribute('placeholder', 'Add a new task');
};

const addTask = () => {
	if (input.value !== '') {
		createTask();
		clearInput();
	} else {
		input.classList.add('add-input-error');
		input.setAttribute('placeholder', 'Cannot add an empty task');
	}
};

const createTask = () => {
	todoList.classList.add('todo-list-visible');

	const newTask = document.createElement('li');
	newTask.classList.add('todo');
	newTask.textContent = input.value;
	todoList.appendChild(newTask);

	const tools = document.createElement('div');
	tools.classList.add('todo-tools');
	tools.innerHTML = ` <button class="todo-btn complete-todo"><i class="fa-solid fa-circle-check"></i></button><button
    class="todo-btn delete-todo"><i class="fa-solid fa-circle-xmark"></i></button>`;
	newTask.appendChild(tools);

	taskCount++;
	activeTasks++;
	countTasks();
	handleStats();
};

const toolsEvents = (e) => {
	if (e.target.classList.contains('fa-circle-check')) {
		e.target.closest('li').classList.add('todo-marked');
		activeTasks--;
		completedTasks++;
		handleStats();
	} else if (e.target.classList.contains('fa-circle-xmark')) {
		if (e.target.closest('li').classList.contains('todo-marked')) {
			completedTasks--;
			handleStats();
		} else {
			activeTasks--;
			handleStats();
		}
		e.target.closest('li').remove();
		taskCount--;
		countTasks();
	}
};

const countTasks = () => {
	if (taskCount === 0) {
		info.classList.add('info-visible');
		todoList.classList.remove('todo-list-visible');
		deleteAllBtn.classList.remove('delete-all-btn-visible');
	} else {
		info.classList.remove('info-visible');
		deleteAllBtn.classList.add('delete-all-btn-visible');
	}
};

const handleStats = () => {
	if (activeTasks >= 0 && completedTasks >= 0) {
		statsActive.textContent = activeTasks;
		statsComplete.textContent = completedTasks;
	} else {
		activeTasks = 0;
		completedTasks = 0;
		statsComplete.textContent = completedTasks;
	}
};

const showAllTasks = () => {
	navAllTasks.classList.add('nav-active');
	navActiveTasks.classList.remove('nav-active');
	navCompletedTasks.classList.remove('nav-active');

	const tasksArr = Array.from(tasksCollection);
	tasksArr.forEach((task) => {
		task.style.display = 'flex';
	});
};

const showActiveTasks = () => {
	navActiveTasks.classList.add('nav-active');
	navAllTasks.classList.remove('nav-active');
	navCompletedTasks.classList.remove('nav-active');

	const tasksArr = Array.from(tasksCollection);
	tasksArr.forEach((task) => {
		if (task.classList.contains('todo-marked')) {
			task.style.display = 'none';
		} else {
			task.style.display = 'flex';
		}
	});
};

const showCompletedTasks = () => {
	navCompletedTasks.classList.add('nav-active');
	navActiveTasks.classList.remove('nav-active');
	navAllTasks.classList.remove('nav-active');

	const tasksArr = Array.from(tasksCollection);
	tasksArr.forEach((task) => {
		if (task.classList.contains('todo-marked')) {
			task.style.display = 'flex';
		} else {
			task.style.display = 'none';
		}
	});
};

const clearList = () => {
	todoList.innerHTML = '';
	taskCount = 0;
	activeTasks = 0;
	completedTasks = 0;
	countTasks();
	handleStats();
	clearInput();
};

const enterCheck = (e) => {
	if (e.key === 'Enter') {
		addTask();
	}
};

lightModeBtn.addEventListener('click', changeLightMode);
input.addEventListener('keyup', enterCheck);
navAllTasks.addEventListener('click', showAllTasks);
navActiveTasks.addEventListener('click', showActiveTasks);
navCompletedTasks.addEventListener('click', showCompletedTasks);
todoList.addEventListener('click', toolsEvents);
deleteAllBtn.addEventListener('click', clearList);
countTasks();
