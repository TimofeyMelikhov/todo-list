import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	Button,
	Container,
	Grid,
	IconButton,
	Paper,
	Toolbar,
	Typography
} from '@mui/material'
import { useReducer, useState } from 'react'
import { v1 } from 'uuid'

import { AddItemForm } from './components/AddItemForm'
import { Todolist } from './components/Todolist'

import './App.css'
import {
	FilterValuesType,
	ITasks,
	ITodoListType,
	TasksStateType
} from './models/models'
import {
	addNewTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	tasksReducer
} from './state/tasksReducer'
import {
	addTodolistAC,
	changeFilterTodolistAC,
	changeTitleTodolistAC,
	removeTodolistAC,
	todolistsReducer
} from './state/todolistsReducer'

function AppWithReducers() {
	const removeTask = (id: string, todolistId: string): void => {
		dispatchToTask(removeTaskAC(todolistId, id))
	}

	const removeTodolist = (todolistId: string): void => {
		dispatchToTodolist(removeTodolistAC(todolistId))
	}

	const addTask = (taskTitle: string, todolistId: string): void => {
		dispatchToTask(addNewTaskAC(taskTitle, todolistId))
	}

	const changeFilter = (value: FilterValuesType, todolistId: string): void => {
		dispatchToTodolist(changeFilterTodolistAC(value, todolistId))
	}

	const changeStatus = (
		id: string,
		isDone: boolean,
		todolistId: string
	): void => {
		dispatchToTask(changeTaskStatusAC(todolistId, id, isDone))
	}

	const changeTitle = (
		id: string,
		newTitle: string,
		todolistId: string
	): void => {
		dispatchToTask(changeTaskTitleAC(todolistId, id, newTitle))
	}

	const changeTodolistHeader = (id: string, newTitle: string): void => {
		dispatchToTodolist(changeTitleTodolistAC(newTitle, id))
	}

	let todolistId1 = v1()
	let todolistId2 = v1()
	let todolistId3 = v1()

	let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'all'
		},
		{
			id: todolistId2,
			title: 'What to watch',
			filter: 'active'
		},
		{
			id: todolistId3,
			title: 'What to game',
			filter: 'all'
		}
	])

	let [tasksObj, dispatchToTask] = useReducer(tasksReducer, {
		[todolistId1]: [
			{
				id: v1(),
				titleTask: 'CSS&HTML',
				isDone: true
			},
			{
				id: v1(),
				titleTask: 'JS',
				isDone: true
			},
			{
				id: v1(),
				titleTask: 'React',
				isDone: false
			}
		],
		[todolistId2]: [
			{
				id: v1(),
				titleTask: '13 reasons',
				isDone: false
			},
			{
				id: v1(),
				titleTask: 'Dark',
				isDone: false
			}
		],
		[todolistId3]: [
			{
				id: v1(),
				titleTask: 'Witcher 3',
				isDone: true
			},
			{
				id: v1(),
				titleTask: 'Fallout 76',
				isDone: true
			},
			{
				id: v1(),
				titleTask: 'Dota 2',
				isDone: true
			}
		]
	})

	const addTodolist = (title: string) => {
		dispatchToTodolist(addTodolistAC(title))
	}

	return (
		<div className='App'>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						News
					</Typography>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container>
					<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container spacing={3}>
					{todolists.map(item => {
						let tasksForTodolist = tasksObj[item.id]
						switch (item.filter) {
							case 'completed':
								tasksForTodolist = tasksForTodolist.filter(
									task => task.isDone === true
								)
								break
							case 'active':
								tasksForTodolist = tasksForTodolist.filter(
									task => task.isDone === false
								)
								break
							default:
								break
						}

						return (
							<Grid item key={item.id} style={{ marginTop: '15px' }}>
								<Paper style={{ padding: '10px' }}>
									<Todolist
										id={item.id}
										title={item.title}
										filter={item.filter}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeStatus={changeStatus}
										removeTodolist={removeTodolist}
										changeTitle={changeTitle}
										changeTodolistHeader={changeTodolistHeader}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}

export default AppWithReducers
