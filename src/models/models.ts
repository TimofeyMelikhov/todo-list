export interface IProps {
  title: string,
  tasks: Array<ITasks>
  removeTask: Function
}
export interface ITasks {
  id: number,
  titleTask: string,
  isDone: boolean
}