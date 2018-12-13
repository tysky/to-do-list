import React from 'react';
import Tasks from './TasksList';
import NewTaskInput from './NewTaskInput';

function App() {
  return (
    <>
      <NewTaskInput />
      <Tasks />
    </>
  );
}

export default App;
