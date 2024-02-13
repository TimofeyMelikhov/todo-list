import { userReducer } from './userReducer'

test('user reducer should increment only age', () => {
	const startState = { age: 25, childrenCount: 26, name: 'Tima' }

	const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

	expect(endState.age).toBe(26)
	expect(endState.childrenCount).toBe(26)
})

test('user reducer should increment only childrencount', () => {
	const startState = { age: 20, childrenCount: 2, name: 'Tima' }

	const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT' })

	expect(endState.childrenCount).toBe(3)
	expect(endState.age).toBe(20)
})

test('user reducer should change name of user', () => {
	const startState = { age: 20, childrenCount: 2, name: 'Tima' }

	const newName = 'Timofey'

	const endState = userReducer(startState, {
		type: 'CHANGE-NAME',
		newName: newName
	})

	expect(endState.childrenCount).toBe(2)
	expect(endState.age).toBe(20)
	expect(endState.name).toBe(newName)
})
