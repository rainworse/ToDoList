import { DOMElementGenerator } from './DOMElementGenerator';
import { DOMController } from './DOMController';
import { PersistenceUtils } from './PersistenceUtils';

const TaskUtils = (() => {
  const addTask = function (task) {
    const newTaskElement = createTaskElement(task);
    newTaskElement.classList.add('selected');
    document.getElementById('selected-list-tasks').appendChild(newTaskElement);
    const dummyEvent = {
      target: newTaskElement,
      stopPropagation: () => {},
    };
    editTask(dummyEvent);
  };

  const createTaskElement = function (task) {
    const taskElement = DOMElementGenerator.generateTask(task);
    if (task.selected) {
      taskElement.classList.add('selected');
    }
    taskElement.addEventListener('click', setSelectedTask);
    taskElement.editButton.addEventListener('click', editTask);
    taskElement.removeButton.addEventListener('click', removeTask);
    return taskElement;
  };

  const editTask = function (event) {
    event.stopPropagation();
    const taskElement = getTaskDOMElementFromChildElement(event.target);
    DOMElementGenerator.editTask(
      getTaskDOMElementFromChildElement(taskElement)
    );
    taskElement
      .querySelectorAll('.task-edit-box')
      .forEach((b) =>
        b.addEventListener('click', (event) => event.stopPropagation())
      );
    const taskDescriptionEditBox = taskElement.querySelector(
      '.task-description-edit-box'
    );
    taskDescriptionEditBox.addEventListener('click', (event) =>
      event.stopPropagation()
    );
    taskDescriptionEditBox.focus();
    taskElement.commitButton.addEventListener('click', commitEditTask);
    taskElement.beingEdited = true;
    taskElement.taskObject.beingEdited = true;
  };

  const commitEditTask = function (event) {
    event.stopPropagation();
    const taskElement = getTaskDOMElementFromChildElement(event.target);
    taskElement.beingEdited = false;
    taskElement.taskObject.beingEdited = false;
    const task = taskElement.taskObject;
    const newTitle = taskElement.querySelector('.task-name-edit-box').value;
    const newDueDate = taskElement.querySelector(
      '.task-deadline-edit-box'
    ).value;
    const newPriority = taskElement.querySelector(
      '.task-priority-edit-box'
    ).value;
    const newDescription = taskElement.querySelector(
      '.task-description-edit-box'
    ).value;
    task.title = newTitle;
    task.dueDate = newDueDate;
    task.priority = newPriority;
    task.description = newDescription;
    const newTaskElement = createTaskElement(task);
    taskElement.parentNode.replaceChild(newTaskElement, taskElement);
    if (newTitle === null || newTitle === '') {
      DOMController.getSelectedList().removeTask(task);
      newTaskElement.remove();
    } else {
      PersistenceUtils.storeLocalData(DOMController.lists);
    }
  };

  const dummyCommitEditTask = function (task) {
    const dummyEvent = {
      target: task,
      stopPropagation: () => {},
    };
    commitEditTask(dummyEvent);
  };

  const removeTask = function (event) {
    event.stopPropagation();
    const taskElement = getTaskDOMElementFromChildElement(event.target);
    const taskObject = taskElement.taskObject;
    DOMController.getSelectedList().removeTask(taskObject);
    taskElement.remove();
    PersistenceUtils.storeLocalData(DOMController.lists);
  };

  const setSelectedTask = function (event) {
    let taskElement = getTaskDOMElementFromChildElement(event.target);
    if (taskElement.classList.contains('selected')) {
      taskElement.classList.remove('selected');
      taskElement.taskObject.selected = false;
      if (taskElement.beingEdited) {
        dummyCommitEditTask(taskElement);
      }
    } else {
      taskElement.classList.add('selected');
      taskElement.taskObject.selected = true;
    }
  };

  const getTaskDOMElementFromChildElement = function (elem) {
    let taskElement = elem;
    while (
      (taskElement !== null || taskElement !== undefined) &&
      !taskElement.classList.contains('task')
    ) {
      taskElement = taskElement.parentElement;
    }

    return taskElement;
  };

  const getTaskDOMElementFromTask = function (task) {
    const tasks = document.querySelectorAll('.task');
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].taskObject === task) {
        return tasks[i];
      }
    }
  };

  const handleTasksBeingEdited = function (tasks) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].beingEdited) {
        dummyCommitEditTask(getTaskDOMElementFromTask(tasks[i]));
      }
    }
  };

  return { addTask, createTaskElement, handleTasksBeingEdited };
})();

export { TaskUtils };
