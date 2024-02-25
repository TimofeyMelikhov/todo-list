import ReactDOM from 'react-dom/client'

import AppWithRedux from './AppWithRedux'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './state/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
<Provider store={store}>
  <AppWithRedux />
</Provider>
)
