const host = '/api/v1';

export default {
  tasksUrl: () => `${host}/tasks`,
  taskUrl: taskId => `${host}/tasks/${taskId}`,
};
