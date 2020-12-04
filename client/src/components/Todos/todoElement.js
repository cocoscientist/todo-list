import React from 'react';

export default function Todo(props) {
    return (
      <div className="row" id={props.todoId}>
      <div className="col s4 m6 offset-s3">
      <div className={(props.status===0)?"card red darken-1":"card blue-grey darken-1"}>
        <div className="card-content white-text">
          <span className="card-title">{props.title}</span>
          <p>Status: {(props.status===0)?"Not ":""}Completed</p>
        </div>
      </div>
    </div>
    </div>
      );
}