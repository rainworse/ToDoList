import { List } from './ToDoList';
import { DOMElementGenerator } from './DOMElementGenerator';
import { DOMController } from './DOMController';
import { PersistenceUtils } from './PersistenceUtils';

const ListUtils = (() => {
  const createListElement = function (list) {
    const newListElement = DOMElementGenerator.generateList(list);
    newListElement.addEventListener('click', setSelectedList);
    newListElement.editButton.addEventListener('click', editList);
    newListElement.removeButton.addEventListener('click', removeList);
    return newListElement;
  };

  const editList = function (event) {
    event.stopPropagation();
    const listElement = getListDOMElementFromChildElement(event.target);
    DOMElementGenerator.editList(listElement);
    listElement.commitButton.addEventListener('click', commitEditList);
    const listNameEditBox = listElement.querySelector('.list-name-edit-box');
    listNameEditBox.addEventListener('focusout', commitEditList);
    listNameEditBox.focus();
  };

  const commitEditList = function (event) {
    event.stopPropagation();
    const listElement = getListDOMElementFromChildElement(event.target);
    const list = listElement.listObject;
    const newName = listElement.querySelector('.list-name-edit-box').value;
    const oldName = list.name;
    const replaceElementIndex = DOMController.listDOMElements.findIndex(
      (l) => l.listObject.name === oldName
    );
    list.name = newName;
    const newListElement = createListElement(list);
    DOMController.listDOMElements[replaceElementIndex] = newListElement;
    DOMController.displayLists();
    PersistenceUtils.storeLocalData(DOMController.lists);
  };

  const removeList = function (event) {
    event.stopPropagation();
    const listDOMElement = getListDOMElementFromChildElement(event.target);
    const list = listDOMElement.listObject;
    if (listDOMElement.classList.contains('selected')) {
      DOMController.getSelectedList = null;
      DOMController.displayTasks();
    }
    listDOMElement.remove();
    DOMController.removeList(list, listDOMElement);
    PersistenceUtils.storeLocalData(DOMController.lists);
  };

  const setSelectedList = function (event) {
    const clickedList = getListDOMElementFromChildElement(event.target);

    Array.from(clickedList.parentNode.childNodes).forEach((sibling) => {
      sibling.classList.remove('selected');
    });
    clickedList.classList.add('selected');
    DOMController.setSelected(clickedList);
    DOMController.displayTasks();
  };

  const addNewListButton = function (listContainerElement) {
    const newListButton = DOMElementGenerator.generatePlusIcon();
    newListButton.addEventListener('click', handleNewList);
    listContainerElement.appendChild(newListButton);
  };

  const handleNewList = function (event) {
    const newList = new List('');
    DOMController.addList(newList);
    DOMController.displayLists();
    const newEvent = {
      stopPropagation: () => {},
      target: getListDOMElementFromList(newList).firstChild.firstChild,
    };
    editList(newEvent);
  };

  const getListDOMElementFromList = function (list) {
    return DOMController.listDOMElements.find(
      (l) => l.listObject.name === list.name
    );
  };

  const getListDOMElementFromChildElement = function (elem) {
    let listElement = elem;
    while (
      (listElement !== null || listElement !== undefined) &&
      !listElement.classList.contains('list')
    ) {
      listElement = listElement.parentElement;
    }
    return listElement;
  };

  return {
    createListElement,
    addNewListButton,
    getListDOMElementFromList,
    getListDOMElementFromChildElement,
  };
})();

export { ListUtils };
