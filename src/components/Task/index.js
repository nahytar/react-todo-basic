import React from 'react';
import { Link } from 'react-router-dom';

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const Task = ({tarea, index, handleDone}) => (
  <div className="task">
    <Link to={`/task/${tarea.id}`}><h2 className={tarea.done ? 'finish' : 'oncourse'}>{tarea.title}</h2></Link>
    <p className="tag">{tarea.tags.map(tag => `#${tag} `)}</p>
    <p className="date">{new Date(tarea.createdAt).toLocaleDateString('es-ES', options)}</p>
    <p className={tarea.done ? 'finish' : 'oncourse'}>{tarea.description}</p>
    <button
      className="finish-button"
      type="submit"
      onClick={(e) => handleDone(e, index)}
    >
      {tarea.done ? 'Reactivar' : 'Finalizar'}
    </button>
  </div>
);

export default Task;
