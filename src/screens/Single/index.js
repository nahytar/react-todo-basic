import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Task from '../../components/Task';

class Single extends Component {
  state = {
    tareas: [],
    tarea: null,
    index: 0
  }

  componentDidMount() {
    const tareas = localStorage.getItem("tareas");
    this.setState({tareas: JSON.parse(tareas)});
  }

  static getDerivedStateFromProps(props, state) {
    let { tareas, tarea, index } = state;
    const {match} = props;

    if (tareas.length && match && match.params.taskId && !tarea) {
      tarea = tareas.filter(t => t.id === match.params.taskId)[0];
      index = tareas.findIndex(x => x.id === match.params.taskId);
    }
    return({tarea, tareas, index});
  }


  handleDone = (e, id) => {
    e.preventDefault();
    const { tareas } = this.state;
    tareas[id].done = !tareas[id].done;
    tareas[id].finishedAt = new Date();
    this.setState({tareas});
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }

  render() {
    const { tarea, index } = this.state;
    return (
      <div>
      <Link to="/">Ir al Home</Link>
      {tarea &&
        <Task tarea={tarea} index={index} handleDone={this.handleDone} />
      }
      {!tarea && <h1>No existe esta tarea</h1>}
      </div>
    );
  }
}

export default Single;