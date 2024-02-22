import { ITodoListType, TasksStateType } from '../models/models'

import { tasksReducer } from './tasksReducer'
import { addTodolistAC, todolistsReducer } from './todolistsReducer'

test('new property with new array should be added when new todolist is added', () => {
	const startTasksState: TasksStateType = {}

	const startTodolistsState: ITodoListType[] = []

	const action = addTodolistAC('new todolist')

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState)
	const idFromTask = keys[0]
	const idFromTodolists = endTodolistsState[0].id

	expect(idFromTask).toBe(action.todolistId)
	expect(idFromTodolists).toBe(action.todolistId)
})
