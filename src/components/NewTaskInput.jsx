import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../actions';

const mapStateToProps = ({ newTaskInputText, taskSendingState, tasks }) => {
  const props = {
    newTaskInputText,
    taskSendingState,
    tasksLength: Object.values(tasks).length,
  };
  return props;
};

class NewTaskInput extends React.Component {
  handleInputText = (e) => {
    const { updateNewTaskText } = this.props;
    updateNewTaskText({ text: e.target.value });
  }

  addTask = (e) => {
    e.preventDefault();
    const { addTask, newTaskInputText, tasksLength } = this.props;
    addTask({ text: newTaskInputText, taskIndex: tasksLength + 1 });
  }

  render() {
    const { newTaskInputText, taskSendingState } = this.props;
    const disabled = taskSendingState === 'requested';
    return (
      <form onSubmit={this.addTask}>
        <label htmlFor="new-task">
          Add Task
          <input
            id="new-task"
            className="addTaskInput"
            type="text"
            required
            value={newTaskInputText}
            onChange={this.handleInputText}
            disabled={disabled}
            autoComplete="off"
          />
        </label>
        <button type="submit" disabled={disabled}>Add</button>
      </form>
    );
  }
}

NewTaskInput.propTypes = {
  addTask: PropTypes.func.isRequired,
  newTaskInputText: PropTypes.string.isRequired,
  updateNewTaskText: PropTypes.func.isRequired,
  taskSendingState: PropTypes.string.isRequired,
  tasksLength: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(NewTaskInput);
