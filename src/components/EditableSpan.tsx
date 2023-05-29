import { IEditableSpan } from "../models/models"
import { useState, ChangeEvent } from 'react'

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

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  return (
    editMode 
    ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
    : <span onDoubleClick={activateEditMode}>{props.titleTask}</span>
  )
}