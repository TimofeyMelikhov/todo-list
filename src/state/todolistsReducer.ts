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

export let todolistId1 = v1()
export let todolistId2 = v1()
export let todolistId3 = v1()

const initialState: ITodoListType[] = [
	{
		id: todolistId1,
		title: 'What to learn',
		filter: 'all'
	},
	{
		id: todolistId2,
		title: 'What to watch',
		filter: 'active'
	},
	{
		id: todolistId3,
		title: 'What to game',
		filter: 'all'
	}
]

export const todolistsReducer = (
	state: ITodoListType[] = initialState,
	action: ActionsTypeTodo
): ITodoListType[] => {
	switch (action.type) {
		case ReducersForTodo.REMOVE_TODOLIST: {
			return state.filter(tl => tl.id !== action.id)
		}
		case ReducersForTodo.ADD_TODOLIST: {
			return [
				{
					id: action.todolistId,
					title: action.title,
					filter: 'all'
				},
				...state
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
			return state
	}
}

export const removeTodolistAC = (
	todolistId: string
): RemoveTodolistActionType => {
	return { type: ReducersForTodo.REMOVE_TODOLIST, id: todolistId }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
	return { type: ReducersForTodo.ADD_TODOLIST, title, todolistId: v1() }
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
