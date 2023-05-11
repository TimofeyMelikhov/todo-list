import React, { useState } from "react";
import { v1 } from 'uuid'
import "./App.css";
import { Todolist } from "./components/Todolist";
import { ITasks, FilterValuesType } from "./models/models";

function App() {

  const [tasks, setTasks] = useState<ITasks[]>([
    {
      id: v1(),
      titleTask: "CSS&HTML",
      isDone: true
    },
    {
      id: v1(),
      titleTask: "JS",
      isDone: true,
    },
    {
      id: v1(),
      titleTask: "React",
      isDone: false,
    }
  ])
  const [filter, setFilter] = useState<FilterValuesType>('all')

  const removeTask = (id: string): void => {
    let filteredTasks = tasks.filter( item => item.id !== id)
    setTasks(filteredTasks)
  }

  const addTask = (taskTitle: string) => {
    let newTask: ITasks = {
      id: v1(),
      titleTask: taskTitle,
      isDone: false
    }
    setTasks([newTask, ...tasks])
  }

  let tasksForTodolist = tasks
  switch(filter) {
    case 'completed':
      tasksForTodolist = tasks.filter(task => task.isDone === true)
      break;
    case 'active' :
      tasksForTodolist = tasks.filter(task => task.isDone === false)
      break;
    default: 
      break;
  }

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value)
  }

  const changeStatus = (id: string, isDone: boolean) => {
    let task = tasks.find(task => task.id === id)
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  return (
    <div className="App">
      <Todolist title="What to learn" 
        tasks={tasksForTodolist} 
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
