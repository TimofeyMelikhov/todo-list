import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { IProps } from "../models/models";

export function Todolist({
  id,
  title, 
  tasks, 
  removeTask, 
  changeFilter, 
  addTask, 
  changeStatus,
  filter
}: IProps) {

  const [taskTitle, setTaskTitle] = useState<string>('')

  const [error, setError] = useState<boolean | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }

  const oneKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false)
    if (e.key === 'Enter') {
      if (taskTitle.trim() !== '') {
        addTask(taskTitle.trim(), id)
      } else {
        setError(true)
      }
      setTaskTitle('')
    }
  }

  const addNewTask = () => {
    if (taskTitle.trim() !== '') {
      addTask(taskTitle.trim(), id)
      setError(false)
    } else {
      setError(true)
    }
    setTaskTitle('')
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input type="text"
          className={error ? 'error' : ''}
          value={ taskTitle }
          onChange={ onNewTitleChangeHandler }
          onKeyPress={ oneKeyPressHandler }
        />
        <button onClick={ addNewTask }
        >+</button>
        { error && <div className="error-message"> Напишите задачу </div> }
      </div>
      <ul>
        {tasks.map(({ id, isDone, titleTask }) => {

          const onChangeHandlerStatus = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(id, e.currentTarget.checked, id)
          }

          return (
            <li key={id} className={isDone ? 'is-done' : ''}>
              <input type="checkbox" 
                checked={isDone}
                onChange={onChangeHandlerStatus}
                />
              <span>{titleTask}</span>
              <button onClick={ () => removeTask(id, id) }>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button className={filter === 'all' ? 'active-filter' : ''} onClick={ () => changeFilter('all', id) }>All</button>
        <button className={filter === 'active' ? 'active-filter' : ''} onClick={ () => changeFilter('active', id) }>Active</button>
        <button className={filter === 'completed' ? 'active-filter' : ''} onClick={ () => changeFilter('completed', id) }>Completed</button>
      </div>
    </div>
  );
}
