import { PersistenceUtils } from './PersistenceUtils';
import { List } from './ToDoList';
import { DOMController } from './DOMController';

function loadData() {
  if (PersistenceUtils.checkStorageAvailable('localStorage')) {
    const localStorageData = PersistenceUtils.getLocalStorageData();
    if (
      localStorageData !== null &&
      localStorageData !== undefined &&
      localStorageData !== ''
    ) {
      const loadedData = PersistenceUtils.parseData(localStorageData);
      if (loadedData === null) {
        return createDefaultContent();
      } else {
        console.log('listContainer');
        return loadedData;
      }
    } else {
      return createDefaultContent();
    }
  } else {
    return createDefaultContent();
  }
}

function createDefaultContent() {
  const listContainer = [];
  const dailyList = new List('Daily');
  dailyList.addTask(
    'Clean up',
    '05/14/2003',
    5,
    'Make the kitchen, vaccuum the shower and wash the ceiling'
  );
  dailyList.addTask(
    'Buy food',
    '05/14/2003',
    2,
    'Need to buy: onions, rubber gloves, lotion, pringles can, sponge'
  );
  listContainer.push(dailyList);
  listContainer.push(new List('Monthly'));
  return listContainer;
}

const listContainer = loadData(listContainer);
listContainer.forEach((l) => DOMController.addList(l));
DOMController.displayLists();
