import React from 'react';

export default function Todo(props) {
    return (
        <li className="todo stack-small" id={props.todoId}>
          <div className="c-cb">
            <input id={props.todoId} type="checkbox" defaultChecked={props.status===1} />
            <label className="todo-label" htmlFor={props.todoId}>
              {props.name}
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">{props.title}</span>
            </button>
            <button type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">{props.title}</span>
            </button>
          </div>
        </li>
      );
}