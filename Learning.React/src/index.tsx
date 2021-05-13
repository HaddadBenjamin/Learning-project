import React from 'react'
import ReactDOM from 'react-dom';
import './index.css'
import * as serviceWorker from './serviceWorker'
import Counter from './components/Counter'
import ControledAndUncontroledFields from './components/ControledAndUncontroledFields'
import MyContextConsumer, {initialUserState, UserContext} from './components/PlayWithContext'
import FilterableAndSearchableTodoTable from './components/Todos/FilterableAndSearchableTodoTable'
import InfiniteScrolling from './components/InfiniteScrolling'
import FormWithFormikAndYup from './components/FormWithFormikAndYup'
import FormWithReactHookForm from './components/FormWithReactHookForm'
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <UserContext.Provider value={initialUserState}>
                <div className="container col-8">
                    <FilterableAndSearchableTodoTable/>
                    <Counter initialValue={1}/>
                    <ControledAndUncontroledFields />
                    <MyContextConsumer/>
                    <FormWithReactHookForm/>
                    <FormWithFormikAndYup/>
                    <InfiniteScrolling/>
                </div>
            </UserContext.Provider>
        </Provider>
    </React.StrictMode>,
    
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
