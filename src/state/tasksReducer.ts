import {
	ActionTypeTask,
	ReducersForTask,
	TasksStateType,
	removeTaskActionType
} from '../models/models'

export const tasksReducer = (
	state: TasksStateType,
	action: ActionTypeTask
): TasksStateType => {
	switch (action.type) {
		case ReducersForTask.ADD_TASK: {
			return { ...state }
		}
		case ReducersForTask.CHANGE_TASK_STATUS: {
			return { ...state }
		}
		case ReducersForTask.CHANGE_TASK_TITLE: {
			return { ...state }
		}
		case ReducersForTask.REMOVE_TASK: {
			return { ...state }
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
