import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {

  state ={
    tasks: [],
    taskName: [],
  };


  componentDidMount() {
    this.socket = io('http://localhost:8000');
  };

  clickedRemove(task){
    const index = this.state.tasks.indexOf(task);
    this.removeTask(index);
  };

  removeTask(id){
    this.state.tasks.splice(id)
    this.socket.emit('removeTask', id)
    console.log('removeTask', id);
  };

  submitForm(event){
    event.preventDefault();
    this.addTask(this.state.taskName);
  };

  addTask(task) {
    this.state.tasks.push(task);
    this.socket.emit('addTask', task);
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>ToDoList.app</h1>
        </header>
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
          <ul className="tasks-section__list" id="tasks-list">
            {this.state.tasks.map(task => (
              <li key={task} className="task">{task}<button onClick={() => this.clickedRemove(task)} className="btn btn--red">Remove</button></li>
            ))}
          </ul>
          <form onSubmit={this.submitForm} id="add-task-form">
            <input onChange={this.state.taskName} value={this.state.taskName} className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" />
            <button className="btn" type="submit">Add</button>
          </form>
        </section>
      </div>
    );
  };
};

export default App;