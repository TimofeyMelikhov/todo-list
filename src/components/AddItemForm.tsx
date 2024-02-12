import { ControlPoint } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

import { IAddItemForm } from '../models/models'

export function AddItemForm(props: IAddItemForm) {
	const [taskTitle, setTaskTitle] = useState<string>('')
	const [error, setError] = useState<boolean | null>(null)

	const addNewTask = () => {
		if (taskTitle.trim() !== '') {
			props.addItem(taskTitle.trim())
			setError(false)
		} else {
			setError(true)
		}
		setTaskTitle('')
	}

	const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.currentTarget.value)
	}

	const oneKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(false)
		if (e.key === 'Enter') {
			if (taskTitle.trim() !== '') {
				props.addItem(taskTitle.trim())
			} else {
				setError(true)
			}
			setTaskTitle('')
		}
	}

	return (
		<div>
			<TextField
				type='text'
				error={!!error}
				helperText={error}
				value={taskTitle}
				onChange={onNewTitleChangeHandler}
				onKeyPress={oneKeyPressHandler}
				label='Add new item'
				variant='standard'
			/>
			<IconButton onClick={addNewTask} color={'primary'}>
				<ControlPoint />
			</IconButton>
			{error && <div className='error-message'> Напишите задачу </div>}
		</div>
	)
}
