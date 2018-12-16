import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import * as actionCreators from '../actions';


const mapStateToProps = ({ tasks }) => {
  const props = {
    tasks,
  };
  return props;
};

const getSpanClass = task => cn({
  completed: task.status === 'completed',
});

class TasksList extends React.Component {
  handleTaskCheckbox = id => () => {
    const { editTask, tasks } = this.props;
    const newStatus = tasks[id].status === 'todo' ? 'completed' : 'todo';
    editTask({ id, status: newStatus });
  }

  render() {
    const { tasks } = this.props;
    const tasksList = Object.values(tasks);
    return (
      <>
        <h3>Todo</h3>
        <ul>
          {tasksList.map(task => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.status === 'completed'}
                onChange={this.handleTaskCheckbox(task.id)}
              />
              <span className={getSpanClass(task)}>{task.text}</span>
            </li>
          ))}
        </ul>
    </>
    );
  }
}

TasksList.propTypes = {
  tasks: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  editTask: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(TasksList);
