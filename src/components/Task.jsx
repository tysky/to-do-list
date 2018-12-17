import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import * as actionCreators from '../actions';


class Task extends React.Component {
  state = { editing: false, editingText: '' } // eslint-disable-line 

  handleTaskCheckbox = () => {
    const { editTask, task: { id, status } } = this.props;
    const newStatus = status === 'todo' ? 'completed' : 'todo';
    editTask({ id, status: newStatus });
  }

  handleDeleteButton = () => {
    const { deleteTask, task: { id } } = this.props;
    deleteTask(id);
  }

  handleEditButton = () => {
    const { task } = this.props;
    this.setState({ editing: true, editingText: task.text });
  }

  handleEditTaskText = (e) => {
    this.setState({ editingText: e.target.value });
  }

  editTask = (e) => {
    e.preventDefault();
    const { editTask, task } = this.props;
    const { editingText } = this.state;
    editTask({ id: task.id, text: editingText });
    this.setState({ editing: false });
  }

  renderEditTaskForm() {
    const { editingText } = this.state;
    return (
      <form onSubmit={this.editTask}>
        <input
          className="editTaskInput"
          type="text"
          required
          value={editingText}
          onChange={this.handleEditTaskText}
          autoComplete="off"
        />
        <button type="submit" className="edit">Edit</button>
      </form>
    );
  }

  render() {
    const { task } = this.props;
    const { editing } = this.state;
    const spanClass = cn({
      completed: task.status === 'completed',
    });
    return (
      <>
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={this.handleTaskCheckbox}
        />
        {editing ? this.renderEditTaskForm()
          : <>
            <span className={spanClass}>{task.text}</span>
            <button type="button" className="edit" onClick={this.handleEditButton}>Edit</button>
           </>
        }
        <button type="button" className="delete" onClick={this.handleDeleteButton}>Delete</button>
      </>
    );
  }
}
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};
export default connect(null, actionCreators)(Task);
