import { TasksStateType } from '../models/models'

import { removeTaskAC, tasksReducer } from './tasksReducer'

test('add new taks', () => {
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
		],
		todolistId3: [
			{
				id: '1',
				titleTask: 'Witcher 3',
				isDone: true
			},
			{
				id: '2',
				titleTask: 'Fallout 76',
				isDone: true
			},
			{
				id: '3',
				titleTask: 'Dota 2',
				isDone: true
			}
		]
	}

	const action = removeTaskAC('todolistId2', '2')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId1'].length).toBe(2)
})
