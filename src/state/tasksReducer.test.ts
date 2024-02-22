import { error } from 'console'

import { TasksStateType } from '../models/models'

import {
	addNewTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	tasksReducer
} from './tasksReducer'
import { addTodolistAC } from './todolistsReducer'

test('remove task', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{
				id: '1',
				titleTask: 'CSS&HTML',
				isDone: true
			},
			{
				id: '2',
				titleTask: 'JS',
				isDone: true
			},
			{
				id: '3',
				titleTask: 'React',
				isDone: false
			}
		],
		todolistId2: [
			{
				id: '1',
				titleTask: '13 reasons',
				isDone: false
			},
			{
				id: '2',
				titleTask: 'Dark',
				isDone: false
			}
		]
	}

	const action = removeTaskAC('todolistId2', '2')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(1)
	expect(endState['todolistId2'].every(t => t.id != '2')).toBe(true)
})

test('add new task', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{
				id: '1',
				titleTask: 'CSS&HTML',
				isDone: true
			},
			{
				id: '2',
				titleTask: 'JS',
				isDone: true
			},
			{
				id: '3',
				titleTask: 'React',
				isDone: false
			}
		],
		todolistId2: [
			{
				id: '1',
				titleTask: '13 reasons',
				isDone: false
			},
			{
				id: '2',
				titleTask: 'Dark',
				isDone: false
			}
		]
	}

	const action = addNewTaskAC('Dune', 'todolistId2')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(3)
	expect(endState['todolistId2'][0].id).toBeDefined()
	expect(endState['todolistId2'][0].titleTask).toBe('Dune')
	expect(endState['todolistId2'][0].isDone).toBeFalsy()
})

test('change task status', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{
				id: '1',
				titleTask: 'CSS&HTML',
				isDone: true
			},
			{
				id: '2',
				titleTask: 'JS',
				isDone: true
			},
			{
				id: '3',
				titleTask: 'React',
				isDone: false
			}
		],
		todolistId2: [
			{
				id: '1',
				titleTask: '13 reasons',
				isDone: false
			},
			{
				id: '2',
				titleTask: 'Dark',
				isDone: false
			}
		]
	}

	const action = changeTaskStatusAC('todolistId2', '1', true)

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'][0].isDone).toBeTruthy()
	expect(endState['todolistId2'].length).toBe(2)
	expect(endState['todolistId2'][0].isDone).toBeTruthy()
})

test('change task title', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{
				id: '1',
				titleTask: 'CSS&HTML',
				isDone: true
			},
			{
				id: '2',
				titleTask: 'JS',
				isDone: true
			},
			{
				id: '3',
				titleTask: 'React',
				isDone: false
			}
		],
		todolistId2: [
			{
				id: '1',
				titleTask: '13 reasons',
				isDone: false
			},
			{
				id: '2',
				titleTask: 'Dark',
				isDone: false
			}
		]
	}

	const action = changeTaskTitleAC('todolistId2', '1', 'Dune')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'][0].titleTask).toBe('CSS&HTML')
	expect(endState['todolistId2'][0].titleTask).toBe(action.taskTitle)
})

test('new property with new array should be added when new todolist is added', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{
				id: '1',
				titleTask: 'CSS&HTML',
				isDone: true
			},
			{
				id: '2',
				titleTask: 'JS',
				isDone: true
			},
			{
				id: '3',
				titleTask: 'React',
				isDone: false
			}
		],
		todolistId2: [
			{
				id: '1',
				titleTask: '13 reasons',
				isDone: false
			},
			{
				id: '2',
				titleTask: 'Dark',
				isDone: false
			}
		]
	}

	const action = addTodolistAC('new todolist')

	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)
	const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')

	if (!newKey) {
		throw Error('new key should be added')
	}
	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})
