export interface IProps {
  id: string
  title: string,
  tasks: Array<ITasks>
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (taskTitle: string, todolistId: string) => void
  changeStatus: (id: string, isDone: boolean, todolistId: string) => void
  filter: FilterValuesType
}
export interface ITasks {
  id: string,
  titleTask: string,
  isDone: boolean
}

export interface ITodoListType {
  id: string
  title: string,
  filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'completed' | 'active'