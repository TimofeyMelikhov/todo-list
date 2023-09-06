import React, { useState } from "react";
import { v1 } from 'uuid'
import "./App.css";
import { Todolist } from "./components/Todolist";
import { ITasks, FilterValuesType, ITodoListType, TasksStateType } from "./models/models";
import { AddItemForm } from "./components/AddItemForm";

function App() {

  const removeTask = (id: string, todolistId:string): void => {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter( item => item.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTasks({...tasksObj})
  }

  const removeTodolist = (todolistId: string): void => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolist(filteredTodolist)
    delete tasksObj[todolistId]
    setTasks({...tasksObj})
  }

  const addTask = (taskTitle: string, todolistId:string): void => {
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

  const changeFilter = (value: FilterValuesType, todolistId: string): void => {
    let todolist = todolists.find(todo => todo.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolist([...todolists])
    }
  }

  const changeStatus = (id: string, isDone: boolean, todolistId: string): void => {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(task => task.id === id)
    if (task) {
      task.isDone = isDone
    }
    setTasks({...tasksObj})
  }

  const changeTitle = (id: string, newTitle: string, todolistId: string): void => {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(task => task.id === id)
    if (task) {
      task.titleTask = newTitle
    }
    setTasks({...tasksObj})
  }

  const changeTodolistHeader = (id: string, newTitle: string): void => {
    const todolist = todolists.find(tl => tl.id === id)
    if(todolist) {
      todolist.title = newTitle
      setTodolist([...todolists])
    }
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

  let [tasksObj, setTasks] = useState<TasksStateType>({
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
        titleTask: "13 reasons",
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

  const addTodolist = (title: string) => {

    let todolist: ITodoListType = {
      id: v1(),
      filter: "all",
      title: title
    }
    setTodolist([todolist, ...todolists])
    setTasks({...tasksObj, [todolist.id]: []})
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>

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
              filter={item.filter}
              tasks={tasksForTodolist} 
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeStatus={changeStatus}
              removeTodolist={removeTodolist}
              changeTitle={changeTitle}
              changeTodolistHeader={changeTodolistHeader}
            />
          )
        })
      }


    </div>
  );
}

export default App;
