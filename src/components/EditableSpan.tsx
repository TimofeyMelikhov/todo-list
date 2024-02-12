import { TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'

import { IEditableSpan } from '../models/models'

export function EditableSpan(props: IEditableSpan) {
	let [editMode, setEditMode] = useState<boolean>(false)
	let [title, setTitle] = useState<string>('')

	const activateEditMode = (): void => {
		setEditMode(true)
		setTitle(props.titleTask)
	}
	const activateViewMode = (): void => {
		setEditMode(false)
		props.onChange(title)
	}

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
		setTitle(e.currentTarget.value)

	return editMode ? (
		<TextField
			value={title}
			onChange={onChangeTitleHandler}
			onBlur={activateViewMode}
			autoFocus
			variant='standard'
		/>
	) : (
		<span onDoubleClick={activateEditMode}>{props.titleTask}</span>
	)
}
