import { List } from './ToDoList';

const PersistenceUtils = (() => {
  const checkStorageAvailable = function (type) {
    let storage;
    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  };

  const getLocalStorageData = function () {
    return localStorage.getItem('lists');
  };

  const storeLocalData = function (data) {
    const dataString = data.reduce(
      (accumulator, currentList) => accumulator.concat(currentList.toString()),
      ''
    );
    localStorage.setItem('lists', dataString);
  };

  const parseData = function (data) {
    try {
      const listStrings = data.split('\n').filter(Boolean);
      const lists = [];
      for (let i = 0; i < listStrings.length; i++) {
        lists.push(parseList(listStrings[i]));
      }
      return lists;
    } catch (e) {
      return null;
    }
  };

  const parseList = function (listString) {
    const [listName, tasksString] = listString.split(':::');
    const list = new List(listName);
    const splitTaskStrings = tasksString.split(';;;').filter(Boolean);
    for (let i = 0; i < splitTaskStrings.length; i++) {
      const taskParams = parseTask(splitTaskStrings[i]);
      list.addTask(...taskParams);
    }
    return list;
  };

  const parseTask = function (taskString) {
    return taskString.split('%');
  };

  return {
    checkStorageAvailable,
    getLocalStorageData,
    storeLocalData,
    parseData,
  };
})();

export { PersistenceUtils };
