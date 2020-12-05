import React from 'react';

export default function Todo(props) {
    return (
      <div className="row" id={props.todoId}>
      <div className="col s4 m6 offset-s3">
      <div className={(props.status===1)?"card blue-grey darken-1":((props.priority===3)?"card red darken-1":((props.priority===2)?"card lime darken-1":"card teal darken-1"))}>
        <div className="card-content white-text">
          <span className="card-title">{props.title}</span>
          <p>Priority: {(props.priority===1)?"Low":(props.priority===2?"Medium":"High")}</p>
        </div>
      </div>
    </div>
    </div>
      );
}