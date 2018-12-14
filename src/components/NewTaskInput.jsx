import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../actions';

const mapStateToProps = ({ newTaskInputText, taskSendingState }) => {
  const props = { newTaskInputText, taskSendingState };
  return props;
};

class NewTaskInput extends React.Component {
  handleInputText = (e) => {
    const { updateNewTaskText } = this.props;
    updateNewTaskText({ text: e.target.value });
  }

  addTask = (e) => {
    e.preventDefault();
    const { addTask, newTaskInputText } = this.props;
    addTask({ text: newTaskInputText });
  }

  render() {
    const { newTaskInputText, taskSendingState } = this.props;
    const disabled = taskSendingState === 'requested';
    return (
      <form onSubmit={this.addTask}>
        <input
          type="text"
          required
          value={newTaskInputText}
          onChange={this.handleInputText}
          disabled={disabled}
        />
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
};

export default connect(
  mapStateToProps,
  actionCreators,
)(NewTaskInput);
