import { DOMController } from './DOMController';
import { DOMElementGenerator } from './DOMElementGenerator';
import { ListUtils } from './ListUtils';
import { TaskUtils } from './TaskUtils';

const DOMControllerUtils = (() => {
  const setupTaskView = function (taskView, selectedListName) {
    taskView.appendChild(
      DOMElementGenerator.generateSelectedListNameElement(selectedListName)
    );
    taskView.appendChild(DOMElementGenerator.generateTaskColumnHeaders());
    const taskContainer = DOMElementGenerator.generateTaskContainer();
    taskView.appendChild(taskContainer);
    const newTaskButton = DOMElementGenerator.generatePlusIcon();
    newTaskButton.id = 'new-task-button';
    newTaskButton.addEventListener('click', DOMController.addTask);
    taskView.appendChild(newTaskButton);

    return taskContainer;
  };

  const listUtils = ListUtils;
  const taskUtils = TaskUtils;

  return { setupTaskView, listUtils, taskUtils };
})();

export { DOMControllerUtils };
