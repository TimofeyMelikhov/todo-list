import { Delete } from '@mui/icons-material'
import { Button, Checkbox, IconButton } from '@mui/material'
import { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { IProps, ITasks } from '../models/models'
import { AppRootState } from '../state/store'
import {
	addNewTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC
} from '../state/tasksReducer'

import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'

export function Todolist({
	id,
	title,
	filter,
	changeFilter,
	removeTodolist,
	changeTodolistHeader
}: IProps) {
	const dispatch = useDispatch()
	const tasks = useSelector<AppRootState, ITasks[]>(state => state.tasks[id])

	const changeTodolistTitle = (newTitle: string) => {
		changeTodolistHeader(id, newTitle)
	}

	let tasksForTodolist = tasks
	switch (filter) {
		case 'completed':
			tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true)
			break
		case 'active':
			tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false)
			break
		default:
			break
	}

	return (
		<div style={{ minHeight: '320px' }}>
			<h3>
				<EditableSpan titleTask={title} onChange={changeTodolistTitle} />
				<IconButton aria-label='delete' onClick={() => removeTodolist(id)}>
					<Delete />
				</IconButton>
			</h3>

			<AddItemForm addItem={title => dispatch(addNewTaskAC(title, id))} />

			<div>
				{tasksForTodolist?.map(task => {
					const onChangeHandlerStatus = (e: ChangeEvent<HTMLInputElement>) => {
						dispatch(changeTaskStatusAC(id, task.id, e.currentTarget.checked))
					}

					const onChangeHandlerTaskTitle = (newValue: string) => {
						dispatch(changeTaskTitleAC(id, task.id, newValue))
					}

					return (
						<div key={task.id} className={task.isDone ? 'is-done' : ''}>
							<Checkbox
								checked={task.isDone}
								onChange={onChangeHandlerStatus}
							/>
							<EditableSpan
								titleTask={task.titleTask}
								onChange={onChangeHandlerTaskTitle}
							/>
							<IconButton
								aria-label='delete'
								onClick={() => dispatch(removeTaskAC(id, task.id))}
							>
								<Delete />
							</IconButton>
						</div>
					)
				})}
			</div>
			<div>
				<Button
					variant={filter === 'all' ? 'contained' : 'text'}
					onClick={() => changeFilter('all', id)}
				>
					All
				</Button>
				<Button
					color={'primary'}
					variant={filter === 'active' ? 'contained' : 'text'}
					onClick={() => changeFilter('active', id)}
				>
					Active
				</Button>
				<Button
					color={'secondary'}
					variant={filter === 'completed' ? 'contained' : 'text'}
					onClick={() => changeFilter('completed', id)}
				>
					Completed
				</Button>
			</div>
		</div>
	)
}
