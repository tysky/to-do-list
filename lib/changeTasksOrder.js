const changeTasksOrder = (tasks, srcIndex, destIndex) => {
  const changedOrderTasks = {};
  const tasksList = Object.values(tasks);
  tasksList.forEach(({ id, taskIndex }) => {
    if (taskIndex === srcIndex) {
      changedOrderTasks[id] = { ...tasks[id], taskIndex: destIndex };
    } else if (taskIndex > srcIndex && taskIndex <= destIndex) { // srcIndex < destIndex
      changedOrderTasks[id] = { ...tasks[id], taskIndex: taskIndex - 1 };
    } else if (taskIndex < srcIndex && taskIndex >= destIndex) { // srcIndex > destIndex
      changedOrderTasks[id] = { ...tasks[id], taskIndex: taskIndex + 1 };
    }
  });
  return changedOrderTasks;
};

module.exports = changeTasksOrder;
