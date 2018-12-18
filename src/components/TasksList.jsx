import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import * as actionCreators from '../actions';
import Task from './Task';
import { sendTasksOrder } from '../socket';


const mapStateToProps = ({ tasks }) => {
  const props = {
    tasks,
    orderedTasksList: Object.values(tasks).sort((a, b) => a.taskIndex - b.taskIndex),
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
    const { orderedTasksList } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h3>Todo</h3>
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
};

export default connect(mapStateToProps, actionCreators)(TasksList);
