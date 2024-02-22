import { v1 } from 'uuid'

import {
	ActionTypeTask,
	AddTaskActionType,
	ChangeTaskStatusActionType,
	ChangeTaskTitleActionType,
	ITasks,
	ReducersForTask,
	ReducersForTodo,
	TasksStateType,
	removeTaskActionType
} from '../models/models'

export const tasksReducer = (
	state: TasksStateType,
	action: ActionTypeTask
): TasksStateType => {
	switch (action.type) {
		case ReducersForTask.ADD_TASK: {
			let newTask: ITasks = {
				id: v1(),
				titleTask: action.taskTitle,
				isDone: false
			}
			return {
				...state,
				[action.todolistId]: [newTask, ...state[action.todolistId]]
			}
		}
		case ReducersForTask.CHANGE_TASK_STATUS: {
			const updatedTask = state[action.todolistId].map(task => {
				if (task.id === action.taskId) {
					return { ...task, isDone: action.isDone }
				}
				return task
			})
			return {
				...state,
				[action.todolistId]: updatedTask
			}
		}
		case ReducersForTask.CHANGE_TASK_TITLE: {
			const updatedTask = state[action.todolistId].map(task => {
				if (task.id === action.taskId) {
					return { ...task, titleTask: action.taskTitle }
				}
				return task
			})
			return {
				...state,
				[action.todolistId]: updatedTask
			}
		}
		case ReducersForTask.REMOVE_TASK: {
			return {
				...state,
				[action.todolistId]: state[action.todolistId].filter(
					t => t.id !== action.taskId
				)
			}
		}
		case ReducersForTodo.ADD_TODOLIST: {
			return { ...state, [action.todolistId]: [] }
		}
		case ReducersForTodo.REMOVE_TODOLIST: {
			const stateCopy = { ...state }
			delete stateCopy[action.id]
			return stateCopy
		}
		default:
			return state
	}
}

export const removeTaskAC = (
	todolistId: string,
	taskId: string
): removeTaskActionType => {
	return {
		type: ReducersForTask.REMOVE_TASK,
		todolistId,
		taskId
	}
}

export const addNewTaskAC = (
	taskTitle: string,
	todolistId: string
): AddTaskActionType => {
	return {
		type: ReducersForTask.ADD_TASK,
		taskTitle,
		todolistId
	}
}

export const changeTaskStatusAC = (
	todolistId: string,
	taskId: string,
	isDone: boolean
): ChangeTaskStatusActionType => {
	return {
		type: ReducersForTask.CHANGE_TASK_STATUS,
		todolistId,
		taskId,
		isDone
	}
}

export const changeTaskTitleAC = (
	todolistId: string,
	taskId: string,
	taskTitle: string
): ChangeTaskTitleActionType => {
	return {
		type: ReducersForTask.CHANGE_TASK_TITLE,
		todolistId,
		taskId,
		taskTitle
	}
}
