import React, { ChangeEvent} from "react";
import { IProps } from "../models/models";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

export function Todolist({
  id,
  title, 
  tasks, 
  filter,
  removeTask, 
  changeFilter, 
  addTask, 
  changeStatus,
  removeTodolist,
  changeTitle,
  changeTodolistHeader
}: IProps) {

  const addTasks = (title: string) => {
    addTask(title, id)
  }

  const changeTodolistTitle = (newTitle: string) => {
    changeTodolistHeader(id, newTitle)
  }

  return (
    <div>
      <h3>
        <EditableSpan titleTask={title} onChange={changeTodolistTitle} />
        <button onClick={() => removeTodolist(id)}>x</button>
      </h3>

      <AddItemForm addItem={addTasks}/>

      <ul>
        {tasks.map((task) => {

          const onChangeHandlerStatus = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(task.id, e.currentTarget.checked, id)
          }

          const onChangeHandlerTitle = (newValue: string) => {
            changeTitle(task.id, newValue, id)
          }

          return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
              <input type="checkbox" 
                checked={task.isDone}
                onChange={onChangeHandlerStatus}
                />
              <EditableSpan titleTask={task.titleTask} onChange={onChangeHandlerTitle} />
              <button onClick={ () => removeTask(task.id, id) }>x</button>
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

