import React, { Component } from 'react';
import uuid from 'uuid/v4';

import Task from '../../components/Task';
import './style.css';

class Home extends Component {
  state = {
    tareas: []
  };

  componentDidMount() {
    const tareas = localStorage.getItem("EF2019LAB-tareas");
    if (tareas) {
      this.setState({ tareas: JSON.parse(tareas) });
    }
  }

  handleDone = (e, id) => {
    e.preventDefault();
    const { tareas } = this.state;
    tareas[id].done = !tareas[id].done;
    tareas[id].finishedAt = new Date();
    this.setState({ tareas });
    localStorage.setItem("EF2019LAB-tareas", JSON.stringify(tareas));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tareas } = this.state;
    const title = e.target.title.value;
    const description = e.target.description.value;
    const task = {
      id: uuid(),
      title,
      description,
      tags: ['react'],
      createdAt: new Date(),
      finishedAt: null
    }

    tareas.push(task);

    this.setState({ tareas });
    e.target.reset();
    localStorage.setItem("EF2019LAB-tareas", JSON.stringify(tareas));
  }

  render() {
    const { tareas } = this.state;

    return (
      <div>
        <h1>Mi Lista</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label htmlFor="title">Título<br />
              <input type="text" id="title" name="title" />
            </label>
          </p>
          <p>
            <textarea name="description" id="description" cols="100" rows="10" />
          </p>
          <p>
            <button type="submit">Crear</button>
          </p>
        </form>
        {tareas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((tarea, index) => (
          <Task key={tarea.id} tarea={tarea} index={index} handleDone={this.handleDone} />
        ))}
        {!tareas.length && <h2>Crea tu primera tarea</h2>}
      </div>
    );
  }
}

export default Home;
