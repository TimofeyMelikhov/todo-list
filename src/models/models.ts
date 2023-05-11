export interface IProps {
  title: string,
  tasks: Array<ITasks>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (taskTitle: string) => void
  changeStatus: (id: string, isDone: boolean) => void
  filter: FilterValuesType
}
export interface ITasks {
  id: string,
  titleTask: string,
  isDone: boolean
}

export type FilterValuesType = 'all' | 'completed' | 'active'