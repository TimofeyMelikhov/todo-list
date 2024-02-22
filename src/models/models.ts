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

export enum ReducersForTodo {
	REMOVE_TODOLIST = 'REMOVE_TODOLIST',
	ADD_TODOLIST = 'ADD_TODOLIST',
	CHANGE_TODO_TITLE = 'CHANGE_TODO_TITLE',
	CHANGE_TODO_FILTER = 'CHANGE_TODO_FILTER'
}
export enum ReducersForTask {
	REMOVE_TASK = 'REMOVE_TASK',
	ADD_TASK = 'ADD_TASK',
	CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
	CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
}

export type RemoveTodolistActionType = {
	type: ReducersForTodo.REMOVE_TODOLIST
	id: string
}
export type AddTodolistActionType = {
	type: ReducersForTodo.ADD_TODOLIST
	title: string
	todolistId: string
}
export type ChangeTitleTodolistActionType = {
	type: ReducersForTodo.CHANGE_TODO_TITLE
	title: string
	id: string
}
export type ChangeFilterTodolistActionType = {
	type: ReducersForTodo.CHANGE_TODO_FILTER
	id: string
	filter: FilterValuesType
}

export type ActionsTypeTodo =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTitleTodolistActionType
	| ChangeFilterTodolistActionType

export type removeTaskActionType = {
	type: ReducersForTask.REMOVE_TASK
	todolistId: string
	taskId: string
}

export type AddTaskActionType = {
	type: ReducersForTask.ADD_TASK
	taskTitle: string
	todolistId: string
}

export type ChangeTaskStatusActionType = {
	type: ReducersForTask.CHANGE_TASK_STATUS
	todolistId: string
	taskId: string
	isDone: boolean
}

export type ChangeTaskTitleActionType = {
	type: ReducersForTask.CHANGE_TASK_TITLE
	todolistId: string
	taskId: string
	taskTitle: string
}

export type ActionTypeTask =
	| removeTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType
