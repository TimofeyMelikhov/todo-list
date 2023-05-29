import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { IAddItemForm } from '../models/models'

export function AddItemForm (props: IAddItemForm) {
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
    <input type="text"
      className={error ? 'error' : ''}
      value={ taskTitle }
      onChange={ onNewTitleChangeHandler }
      onKeyPress={ oneKeyPressHandler }
    />
    <button onClick={ addNewTask }
    >+</button>
    { error && <div className="error-message"> Напишите задачу </div> }
  </div>
  )
}