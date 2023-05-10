import React, { useState } from "react";
import { IProps } from "../models/models";

export function Todolist({ title, tasks, removeTask, changeFilter, addTask }: IProps) {

  const [taskTitle, setTaskTitle] = useState<string>('')

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input type="text" 
          value={ taskTitle }
          onChange={e => setTaskTitle(e.currentTarget.value)}
        />
        <button onClick={ () => {
          addTask(taskTitle)
          setTaskTitle('')
          }}
        >+</button>
      </div>
      <ul>
        {tasks.map(({ id, isDone, titleTask }) => {
          return (
            <li key={id}>
              <input type="checkbox" 
                checked={isDone} 
                />
              <span>{titleTask}</span>
              <button onClick={ () => removeTask(id) }>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={ () => changeFilter('all') }>All</button>
        <button onClick={ () => changeFilter('active') }>Active</button>
        <button onClick={ () => changeFilter('completed') }>Completed</button>
      </div>
    </div>
  );
}
