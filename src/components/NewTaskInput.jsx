import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../actions';

const mapStateToProps = ({ newTaskInputText }) => {
  const props = { newTaskInputText };
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
    const { newTaskInputText } = this.props;
    return (
      <form onSubmit={this.addTask}>
        <input
          type="text"
          required
          value={newTaskInputText}
          onChange={this.handleInputText}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

NewTaskInput.propTypes = {
  addTask: PropTypes.func.isRequired,
  newTaskInputText: PropTypes.string.isRequired,
  updateNewTaskText: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(NewTaskInput);
