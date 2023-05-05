import React from "react";
import { IProps } from "../models/models";

export function Todolist({ title, tasks, removeTask }: IProps) {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input type="text" />
        <button>+</button>
      </div>
      <ul>
        {tasks.map(({ id, isDone, titleTask }) => {
          return (
            <li key={id}>
              <input type="checkbox" checked={isDone} />
              <span>{titleTask}</span>
              <button onClick={ () => removeTask(id) }>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
}
