import { Delete } from '@mui/icons-material'
import { Button, Checkbox, IconButton } from '@mui/material'
import { ChangeEvent } from 'react'

import { IProps } from '../models/models'

import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'

export function Todolist({
	id,
	title,
	tasks,
	filter,
	removeTask,
	changeFilter,
	addTask,
	changeStatus,
	removeTodolist,
	changeTitle,
	changeTodolistHeader
}: IProps) {
	const addTasks = (title: string) => {
		addTask(title, id)
	}

	const changeTodolistTitle = (newTitle: string) => {
		changeTodolistHeader(id, newTitle)
	}

	return (
		<div style={{ minHeight: '320px' }}>
			<h3>
				<EditableSpan titleTask={title} onChange={changeTodolistTitle} />
				<IconButton aria-label='delete' onClick={() => removeTodolist(id)}>
					<Delete />
				</IconButton>
			</h3>

			<AddItemForm addItem={addTasks} />

			<div>
				{tasks.map(task => {
					const onChangeHandlerStatus = (e: ChangeEvent<HTMLInputElement>) => {
						changeStatus(task.id, e.currentTarget.checked, id)
					}

					const onChangeHandlerTitle = (newValue: string) => {
						changeTitle(task.id, newValue, id)
					}

					return (
						<div key={task.id} className={task.isDone ? 'is-done' : ''}>
							<Checkbox
								checked={task.isDone}
								onChange={onChangeHandlerStatus}
							/>
							<EditableSpan
								titleTask={task.titleTask}
								onChange={onChangeHandlerTitle}
							/>
							<IconButton
								aria-label='delete'
								onClick={() => removeTask(task.id, id)}
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
