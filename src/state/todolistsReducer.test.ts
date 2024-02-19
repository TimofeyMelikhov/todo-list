import { v1 } from 'uuid'

import { FilterValuesType, ITodoListType } from '../models/models'

import {
	addTodolistAC,
	changeFilterTodolistAC,
	changeTitleTodolistAC,
	removeTodolistAC,
	todolistsReducer
} from './todolistsReducer'

test('correct todolist should be removed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	const startState: ITodoListType[] = [
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'all'
		},
		{
			id: todolistId2,
			title: 'What to watch',
			filter: 'all'
		}
	]

	const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolistTitle = 'New Todolist'

	const startState: ITodoListType[] = [
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'all'
		},
		{
			id: todolistId2,
			title: 'What to watch',
			filter: 'all'
		}
	]

	const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTodolistTitle)
	expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its name', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolistTitle = 'New Todolist title'

	const startState: ITodoListType[] = [
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'all'
		},
		{
			id: todolistId2,
			title: 'What to watch',
			filter: 'all'
		}
	]

	const endState = todolistsReducer(
		startState,
		changeTitleTodolistAC(newTodolistTitle, todolistId2)
	)

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should changed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolistFilter: FilterValuesType = 'completed'

	const startState: ITodoListType[] = [
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'all'
		},
		{
			id: todolistId2,
			title: 'What to watch',
			filter: 'all'
		}
	]

	const endState = todolistsReducer(
		startState,
		changeFilterTodolistAC(newTodolistFilter, todolistId2)
	)

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newTodolistFilter)
})
