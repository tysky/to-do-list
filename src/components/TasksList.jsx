import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../actions';
import Task from './Task';


const mapStateToProps = ({ tasks }) => {
  const props = {
    tasks,
  };
  return props;
};

class TasksList extends React.Component {
  render() {
    const { tasks } = this.props;
    const tasksList = Object.values(tasks);
    return (
      <>
        <h3>Todo</h3>
        <ul>
          {tasksList.map(task => (
            <li key={task.id}>
              <Task task={task} />
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
};

export default connect(mapStateToProps, actionCreators)(TasksList);
