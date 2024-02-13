export interface IProps {
	id: string
	title: string
	tasks: Array<ITasks>
	filter: FilterValuesType
	removeTask: (id: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (taskTitle: string, todolistId: string) => void
	changeStatus: (id: string, isDone: boolean, todolistId: string) => void
	changeTitle: (id: string, newTitle: string, todolistId: string) => void
	changeTodolistHeader: (id: string, newTitle: string) => void
	removeTodolist: (todolistId: string) => void
}
export interface ITasks {
	id: string
	titleTask: string
	isDone: boolean
}

export interface ITodoListType {
	id: string
	title: string
	filter: FilterValuesType
}

export interface IAddItemForm {
	addItem: (taskTitle: string) => void
}

export interface IEditableSpan {
	titleTask: string
	onChange: (newValue: string) => void
}

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TasksStateType = {
	[key: string]: ITasks[]
}

export enum Reducers {
	REMOVE_TODOLIST = 'REMOVE_TODOLIST',
	ADD_TODOLIST = 'ADD_TODOLIST',
	REMOVE_TASK = 'REMOVE_TASK',
	ADD_TASK = 'ADD_TASK',
	CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
	CHANGE_TODO_TITLE = 'CHANGE_TODO_TITLE',
	CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
}

type RemoveTodolistActionType = {
	type: Reducers.REMOVE_TODOLIST
	id: string
}
type AddTodolistActionType = {
	type: Reducers.ADD_TODOLIST
	title: string
}
type ChangeTitleTodolistActionType = {
	type: Reducers.CHANGE_TODO_TITLE
	title: string
	id: string
}
type ChangeFilterTodolistActionType = {
	type: Reducers.CHANGE_TASK_STATUS
	id: string
	filter: string
}

export type ActionsType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTitleTodolistActionType
	| ChangeFilterTodolistActionType
