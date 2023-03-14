import { Task } from './ToDoList';
import EditIcon from './edit-icon.svg';
import RemoveIcon from './remove-icon.svg';
import CheckIcon from './check-icon.svg';
import PlusIcon from './plus-icon.svg';

const DOMElementGenerator = (() => {
  const generateList = function (list) {
    const listElement = document.createElement('div');
    listElement.classList.add('list');
    listElement.listObject = list;
    const listNameWrapper = document.createElement('div');
    listNameWrapper.classList.add('list-name-wrapper');
    const listName = document.createElement('div');
    listName.classList.add('list-name');
    listName.textContent = list.name;
    listNameWrapper.appendChild(listName);
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    const editIcon = generateEditIcon();
    const removeIcon = generateRemoveIcon();
    listElement.editButton = editIcon;
    listElement.removeButton = removeIcon;
    buttons.appendChild(editIcon);
    buttons.appendChild(removeIcon);
    listElement.appendChild(listNameWrapper);
    listElement.appendChild(buttons);
    return listElement;
  };

  const editList = function (listElement) {
    const buttonContainer = listElement.querySelector('.buttons');
    buttonContainer.innerHTML = '';
    const checkIcon = generateCheckIcon();
    listElement.commitButton = checkIcon;
    buttonContainer.appendChild(checkIcon);

    const listName = listElement.querySelector('.list-name');
    const currentName = listName.textContent;
    listName.innerHTML = '';
    const nameEditBox = document.createElement('input');
    nameEditBox.type = 'text';
    nameEditBox.value = currentName;
    nameEditBox.classList.add('list-name-edit-box');
    listName.appendChild(nameEditBox);
  };

  const generateSelectedListNameElement = function (name) {
    const selectedListNameElement = document.createElement('div');
    selectedListNameElement.id = 'selected-list-name';
    selectedListNameElement.textContent = name;
    return selectedListNameElement;
  };

  const generateTaskContainer = function () {
    const taskContainer = document.createElement('div');
    taskContainer.id = 'selected-list-tasks';
    return taskContainer;
  };

  const generateTaskColumnHeaders = function () {
    const taskContainerColumnHeaders = generateTask(
      new Task('Task name', 'Due date', 'Priority', '')
    );
    taskContainerColumnHeaders.classList.remove('task');
    taskContainerColumnHeaders.id = 'task-columns';
    taskContainerColumnHeaders.removeChild(
      taskContainerColumnHeaders.querySelector('.task-description')
    );

    return taskContainerColumnHeaders;
  };

  const generateTask = function (task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.taskObject = task;
    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = task.title;
    const taskDeadline = document.createElement('div');
    taskDeadline.classList.add('task-deadline');
    taskDeadline.textContent = task.dueDate;
    const taskPriority = document.createElement('div');
    taskPriority.classList.add('task-priority');
    taskPriority.textContent = task.priority;
    const taskDescription = document.createElement('div');
    taskDescription.classList.add('task-description');
    const taskDescriptionTitle = document.createElement('div');
    taskDescriptionTitle.classList.add('task-description-title');
    taskDescriptionTitle.textContent = 'Description:';
    const taskDescriptionText = document.createElement('div');
    taskDescriptionText.classList.add('task-description-text');
    taskDescriptionText.textContent = task.description;
    const taskDescriptionButtons = document.createElement('div');
    taskDescriptionButtons.classList.add('task-description-buttons');
    const editTaskButton = generateEditIcon();
    taskElement.editButton = editTaskButton;
    const removeTaskButton = generateRemoveIcon();
    taskElement.removeButton = removeTaskButton;
    taskDescriptionButtons.appendChild(editTaskButton);
    taskDescriptionButtons.appendChild(removeTaskButton);
    taskDescription.appendChild(taskDescriptionTitle);
    taskDescription.appendChild(taskDescriptionText);
    taskDescription.appendChild(taskDescriptionButtons);
    taskElement.appendChild(taskTitle);
    taskElement.appendChild(taskDeadline);
    taskElement.appendChild(taskPriority);
    taskElement.appendChild(taskDescription);
    return taskElement;
  };

  const editTask = function (taskElement) {
    const buttonContainer = taskElement.querySelector(
      '.task-description-buttons'
    );
    buttonContainer.innerHTML = '';
    const checkIcon = generateCheckIcon();
    taskElement.commitButton = checkIcon;
    buttonContainer.appendChild(checkIcon);

    const taskTitle = taskElement.querySelector('.task-title');
    const currentTitle = taskTitle.textContent;
    taskTitle.innerHTML = '';
    const titleEditBox = document.createElement('input');
    titleEditBox.type = 'text';
    titleEditBox.value = currentTitle;
    titleEditBox.classList.add('task-name-edit-box');
    titleEditBox.classList.add('task-edit-box');
    taskTitle.appendChild(titleEditBox);

    const taskDueDate = taskElement.querySelector('.task-deadline');
    const currentDueDate = taskDueDate.textContent;
    taskDueDate.innerHTML = '';
    const dueDateEditBox = document.createElement('input');
    dueDateEditBox.type = 'text';
    dueDateEditBox.value = currentDueDate;
    dueDateEditBox.classList.add('task-deadline-edit-box');
    dueDateEditBox.classList.add('task-edit-box');
    taskDueDate.appendChild(dueDateEditBox);

    const taskPriority = taskElement.querySelector('.task-priority');
    const currentPriority = taskPriority.textContent;
    taskPriority.innerHTML = '';
    const priorityEditBox = document.createElement('input');
    priorityEditBox.type = 'text';
    priorityEditBox.value = currentPriority;
    priorityEditBox.classList.add('task-priority-edit-box');
    priorityEditBox.classList.add('task-edit-box');
    taskPriority.appendChild(priorityEditBox);

    const taskDescription = taskElement.querySelector('.task-description-text');
    const currentDescription = taskDescription.textContent;
    taskDescription.innerHTML = '';
    const descriptionEditBox = document.createElement('textarea');
    descriptionEditBox.value = currentDescription;
    descriptionEditBox.classList.add('task-description-edit-box');
    taskDescription.appendChild(descriptionEditBox);
  };

  const generateEditIcon = function () {
    const editIcon = document.createElement('img');
    editIcon.src = EditIcon;
    editIcon.id = editButtonID;
    editIcon.classList.add('button');
    editIcon.alt = 'edit';
    return editIcon;
  };

  const generateRemoveIcon = function () {
    const removeIcon = document.createElement('img');
    removeIcon.src = RemoveIcon;
    removeIcon.id = removeButtonID;
    removeIcon.classList.add('button');
    removeIcon.alt = 'remove';
    return removeIcon;
  };

  const generateCheckIcon = function () {
    const checkIcon = document.createElement('img');
    checkIcon.src = CheckIcon;
    checkIcon.id = checkButtonID;
    checkIcon.classList.add('button');
    checkIcon.alt = 'commit';
    return checkIcon;
  };

  const generatePlusIcon = function () {
    const plusIcon = document.createElement('img');
    plusIcon.src = PlusIcon;
    plusIcon.id = plusButtonID;
    plusIcon.classList.add('button');
    plusIcon.alt = 'new list';
    return plusIcon;
  };

  const editButtonID = 'edit-button';
  const removeButtonID = 'remove-button';
  const checkButtonID = 'commit-button';
  const plusButtonID = 'plus-button';

  return {
    generateList,
    editList,
    generateSelectedListNameElement,
    generateTaskContainer,
    generateTaskColumnHeaders,
    generateTask,
    editTask,
    generatePlusIcon,
  };
})();

export { DOMElementGenerator };
