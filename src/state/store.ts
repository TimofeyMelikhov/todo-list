import { tasksReducer } from './tasksReducer';
import { todolistsReducer } from './todolistsReducer';
import { combineReducers, createStore } from "redux";

const rootReducers = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})

export const store =  createStore(rootReducers)

export type AppRootState = ReturnType<typeof rootReducers>