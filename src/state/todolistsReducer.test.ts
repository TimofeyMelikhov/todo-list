import { v1 } from 'uuid'

import { ITodoListType, Reducers } from '../models/models'

import { todolistsReducer } from './todolistsReducer'

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

	const endState = todolistsReducer(startState, {
		type: Reducers.REMOVE_TODOLIST,
		id: todolistId1
	})

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

	const endState = todolistsReducer(startState, {
		type: Reducers.ADD_TODOLIST,
		title: newTodolistTitle
	})

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

	const action = {
		type: Reducers.CHANGE_TODO_TITLE,
		id: todolistId2,
		title: newTodolistTitle
	}

	const endState = todolistsReducer(startState, action)

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should changed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolistFilter = 'complite'

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

	const action = {
		type: Reducers.CHANGE_TASK_STATUS,
		id: todolistId2,
		filter: newTodolistFilter
	}

	const endState = todolistsReducer(startState, action)

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newTodolistFilter)
})
