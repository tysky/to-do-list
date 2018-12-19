import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import * as actionCreators from '../actions';
import Task from './Task';
import { sendTasksOrder } from '../socket';
import Alert from './Alert';


const mapStateToProps = ({
  tasks, tasksFetchingState, taskEditingState, taskDeletingState,
}) => {
  const props = {
    tasks,
    orderedTasksList: Object.values(tasks).sort((a, b) => a.taskIndex - b.taskIndex),
    tasksFetchingState,
    taskEditingState,
    taskDeletingState,
  };
  return props;
};


class TasksList extends React.Component {
  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const { changeTasksOrder } = this.props;
    const indexes = { srcIndex: result.source.index, destIndex: result.destination.index };
    changeTasksOrder(indexes);
    sendTasksOrder(indexes);
  }

  render() {
    const {
      orderedTasksList, tasksFetchingState, taskEditingState, taskDeletingState,
    } = this.props;
    const failed = tasksFetchingState === 'failed';
    const editingFailed = taskEditingState === 'failed';
    const deletingFailed = taskDeletingState === 'failed';
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h3>Todo</h3>
        {failed && <Alert message="Oh snap! Error while loading tasks. Try again." />}
        {editingFailed && <Alert message="Oh snap! Error while editing task. Try again." /> }
        {deletingFailed && <Alert message="Oh snap! Error while deleting task. Try again." /> }
        <Droppable droppableId="droppable">
          {provided => (
            <ul ref={provided.innerRef}>
              {orderedTasksList.map(task => (
                <Draggable key={task.id} draggableId={task.id} index={task.taskIndex}>
                  {providedDraggable => (
                    <li
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                    >
                      <Task task={task} />
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

TasksList.propTypes = {
  tasks: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  tasksFetchingState: PropTypes.string.isRequired,
  taskEditingState: PropTypes.string.isRequired,
  taskDeletingState: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, actionCreators)(TasksList);
