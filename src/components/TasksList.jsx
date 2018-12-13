import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = ({ tasks }) => {
  const props = {
    tasks,
  };
  return props;
};

const TasksList = ({ tasks }) => {
  const tasksList = Object.values(tasks);
  return (
    <ul>
      {tasksList.map(task => <li key={task.id}>{task.text}</li>)}
    </ul>
  );
};

TasksList.propTypes = {
  tasks: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(TasksList);
