import React from 'react';

export default function Todo(props) {
    return (
        <li key={props.todoId}>
          {props.title} <i> Completed: {props.status===0?"False":"True"}</i>
        </li>
      );
}