import React, { useState } from "react";
import { v1 } from 'uuid'
import "./App.css";
import { Todolist } from "./components/Todolist";
import { ITasks, FilterValuesType, ITodoListType } from "./models/models";

function App() {

  const removeTask = (id: string, todolistId:string): void => {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter( item => item.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTasks({...tasksObj})
  }

  const addTask = (taskTitle: string, todolistId:string) => {
    let task: ITasks = {
      id: v1(),
      titleTask: taskTitle,
      isDone: false
    }
    let tasks = tasksObj[todolistId]
    let newTasks = [task, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({...tasksObj})
  }

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    let todolist = todolists.find(todo => todo.id === todolistId)
    if (todolist) {
      todolist.filter = value
    }
    setTodolist([...todolists])
  }

  const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(task => task.id === id)
    if (task) {
      task.isDone = isDone
    }
    setTasks({...tasksObj})
  }

  let todolistId1 = v1()
  let todolistId2 = v1()
  let todolistId3 = v1()

  let [todolists, setTodolist] = useState<ITodoListType[]>( [
    {
      id: todolistId1,
      title: 'What to learn',
      filter: 'all'
    },
    {
      id: todolistId2,
      title: 'What to watch',
      filter: 'completed'
    },
    {
      id: todolistId3,
      title: 'What to game',
      filter: 'active'
    }
  ])

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
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
    ],
    [todolistId2]: [
      {
        id: v1(),
        titleTask: "13 resons",
        isDone: false
      },
      {
        id: v1(),
        titleTask: "Dark",
        isDone: false,
      }
    ],
    [todolistId3]: [
      {
        id: v1(),
        titleTask: "Witcher 3",
        isDone: true
      },
      {
        id: v1(),
        titleTask: "Fallout 76",
        isDone: true,
      },
      {
        id: v1(),
        titleTask: "Dota 2",
        isDone: true,
      }
    ]
  })

  return (
    <div className="App">

      {
        todolists.map(item => {

          let tasksForTodolist = tasksObj[item.id]
          switch(item.filter) {
            case 'completed':
              tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true)
              break;
            case 'active' :
              tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false)
              break;
            default: 
              break;
          }

          return (
            <Todolist
              key={item.id}
              id={item.id}
              title={item.title}
              tasks={tasksForTodolist} 
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeStatus={changeStatus}
              filter={item.filter}
            />
          )
        })
      }


    </div>
  );
}

export default App;
