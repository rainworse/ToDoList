import { DOMControllerUtils } from './DOMControllerUtils';

const DOMController = (() => {
  let lists = [];
  let listDOMElements = [];
  let selectedList;

  const displayLists = function () {
    const listSelectionElement = document.getElementById('list-selection');
    listSelectionElement.innerHTML = '';
    const listContainerElement = document.createElement('div');
    listContainerElement.id = 'lists';
    listSelectionElement.appendChild(listContainerElement);
    DOMControllerUtils.listUtils.addNewListButton(listSelectionElement);
    for (let i = 0; i < listDOMElements.length; i++) {
      listContainerElement.appendChild(listDOMElements[i]);
    }
  };

  const displayTasks = function () {
    const taskView = document.getElementById('task-view');
    taskView.innerHTML = '';

    if (selectedList === null) {
      return;
    }

    const taskContainer = DOMControllerUtils.setupTaskView(
      taskView,
      selectedList.name
    );

    const listTasks = selectedList.tasks;
    for (let i = 0; i < listTasks.length; i++) {
      const currentTaskElement = DOMControllerUtils.taskUtils.createTaskElement(
        listTasks[i]
      );
      taskContainer.appendChild(currentTaskElement);
    }
  };

  const addList = function (list) {
    lists.push(list);
    const newListElement = DOMControllerUtils.listUtils.createListElement(list);
    listDOMElements.push(newListElement);
  };

  const removeList = function (list, listDOMElement) {
    lists = lists.filter((l) => l !== list);
    listDOMElements = listDOMElements.filter((d) => d !== listDOMElement);
  };

  const addTask = function (event) {
    const newTask = selectedList.addTask('', '', '', '');
    newTask.selected = true;
    DOMControllerUtils.taskUtils.addTask(newTask);
  };

  const setSelected = function (clickedList) {
    if (selectedList !== clickedList.listObject) {
      if (selectedList !== null && selectedList !== undefined) {
        DOMControllerUtils.taskUtils.handleTasksBeingEdited(selectedList.tasks);
      }
    }
    selectedList = clickedList.listObject;
  };

  const getSelectedList = function () {
    return selectedList;
  };

  return {
    displayLists,
    displayTasks,
    addList,
    removeList,
    addTask,
    getSelectedList,
    setSelected,
    lists,
    listDOMElements,
  };
})();

export { DOMController };
