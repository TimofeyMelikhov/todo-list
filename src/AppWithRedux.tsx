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
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { AddItemForm } from './components/AddItemForm'
import { Todolist } from './components/Todolist'

import './App.css'
import { FilterValuesType, ITodoListType } from './models/models'
import { AppRootState } from './state/store'
import {
	addTodolistAC,
	changeFilterTodolistAC,
	changeTitleTodolistAC,
	removeTodolistAC
} from './state/todolistsReducer'

function AppWithRedux() {
	const dispatch = useDispatch()
	const todolists = useSelector<AppRootState, ITodoListType[]>(
		state => state.todolists
	)

	const removeTodolist = (todolistId: string): void => {
		dispatch(removeTodolistAC(todolistId))
	}

	const changeFilter = (value: FilterValuesType, todolistId: string): void => {
		dispatch(changeFilterTodolistAC(value, todolistId))
	}

	const changeTodolistTitle = (id: string, newTitle: string): void => {
		dispatch(changeTitleTodolistAC(newTitle, id))
	}

	const addTodolist = (title: string) => {
		dispatch(addTodolistAC(title))
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
						return (
							<Grid item key={item.id} style={{ marginTop: '15px' }}>
								<Paper style={{ padding: '10px' }}>
									<Todolist
										id={item.id}
										title={item.title}
										filter={item.filter}
										changeFilter={changeFilter}
										removeTodolist={removeTodolist}
										changeTodolistHeader={changeTodolistTitle}
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

export default AppWithRedux
