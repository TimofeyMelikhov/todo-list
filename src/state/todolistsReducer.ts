import { v1 } from 'uuid'

import { ActionsType, ITodoListType, Reducers } from '../models/models'

export const todolistsReducer = (
	state: ITodoListType[],
	action: ActionsType
): ITodoListType[] => {
	switch (action.type) {
		case Reducers.REMOVE_TODOLIST: {
			return state.filter(tl => tl.id !== action.id)
		}
		case Reducers.ADD_TODOLIST: {
			return [
				...state,
				{
					id: v1(),
					title: action.title,
					filter: 'all'
				}
			]
		}
		case Reducers.CHANGE_TODO_TITLE: {
			const todolist = state.find(tl => tl.id === action.id)

			if (todolist) {
				todolist.title = action.title
			}

			return [...state]
		}
		case Reducers.CHANGE_TASK_STATUS: {
			const todolist = state.find(tl => tl.id === action.id)

			if (todolist) {
				todolist.filter = action.filter
			}
			return [...state]
		}

		default:
			throw new Error('Error')
	}
}
