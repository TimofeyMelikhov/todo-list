import { v1 } from 'uuid'

import {
	ActionsTypeTodo,
	AddTodolistActionType,
	ChangeFilterTodolistActionType,
	ChangeTitleTodolistActionType,
	FilterValuesType,
	ITodoListType,
	ReducersForTodo,
	RemoveTodolistActionType
} from '../models/models'

export const todolistsReducer = (
	state: ITodoListType[],
	action: ActionsTypeTodo
): ITodoListType[] => {
	switch (action.type) {
		case ReducersForTodo.REMOVE_TODOLIST: {
			return state.filter(tl => tl.id !== action.id)
		}
		case ReducersForTodo.ADD_TODOLIST: {
			return [
				...state,
				{
					id: v1(),
					title: action.title,
					filter: 'all'
				}
			]
		}
		case ReducersForTodo.CHANGE_TODO_TITLE: {
			const todolist = state.find(tl => tl.id === action.id)

			if (todolist) {
				todolist.title = action.title
			}

			return [...state]
		}
		case ReducersForTodo.CHANGE_TODO_FILTER: {
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

export const removeTodolistAC = (
	todolistId: string
): RemoveTodolistActionType => {
	return { type: ReducersForTodo.REMOVE_TODOLIST, id: todolistId }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
	return { type: ReducersForTodo.ADD_TODOLIST, title }
}

export const changeTitleTodolistAC = (
	title: string,
	todolistId: string
): ChangeTitleTodolistActionType => {
	return { type: ReducersForTodo.CHANGE_TODO_TITLE, title, id: todolistId }
}

export const changeFilterTodolistAC = (
	filter: FilterValuesType,
	todolistId: string
): ChangeFilterTodolistActionType => {
	return { type: ReducersForTodo.CHANGE_TODO_FILTER, filter, id: todolistId }
}
