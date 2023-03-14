const List = function (name) {
  this.name = name;
  this.tasks = [];
  this.addTask = function (title, dueDate, priority, description) {
    const newTask = new Task(title, dueDate, priority, description);
    this.tasks.push(newTask);
    return newTask;
  };
  this.removeTask = function (task) {
    this.tasks = this.tasks.filter((t) => t !== task);
  };

  this.toString = function () {
    let output = '';
    output += this.name + ':::';
    this.tasks.forEach((t) => (output += t.toString() + ';;;'));
    output += '\n';
    return output;
  };
};

const Task = function (title, dueDate, priority, description) {
  this.title = title;
  this.dueDate = dueDate;
  this.priority = priority;
  this.description = description;
  this.selected = false;
  this.beingEdited = false;
  this.toString = function () {
    return ''.concat(
      this.title,
      '%',
      this.dueDate,
      '%',
      this.priority,
      '%',
      this.description
    );
  };
};

export { List, Task };
