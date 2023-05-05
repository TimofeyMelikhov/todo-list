import React from "react";
import "./App.css";
import { Todolist } from "./components/Todolist";
import { ITasks } from "./models/models";

function App() {
  let tasks: ITasks[] = [
    {
      id: 1,
      titleTask: "CSS&HTML",
      isDone: true,
    },
    {
      id: 2,
      titleTask: "JS",
      isDone: true,
    },
    {
      id: 3,
      titleTask: "React",
      isDone: false,
    },
  ];

  const removeTask = (id: number): void => {
    tasks.filter( item => item.id !== id)
  }


  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default App;
