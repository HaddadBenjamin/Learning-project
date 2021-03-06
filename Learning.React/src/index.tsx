import React from 'react'
import ReactDOM from 'react-dom';
import './index.css'
import * as serviceWorker from './serviceWorker'
import Counter from "./components/Counter"
import ControledAndUncontroledFields from "./components/ControledAndUncontroledFields"
import MyContextConsumer, {initialUserState, UserContext} from "./components/PlayWithContext"
import FilterableAndSearchableTodoTable from './components/Todos/FilterableAndSearchableTodoTable'
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
      <UserContext.Provider value={initialUserState}>
          <div className="container col-8">
              <FilterableAndSearchableTodoTable/>
              <Counter initialValue={5}/>
              <ControledAndUncontroledFields />
              <MyContextConsumer/>
          </div>
      </UserContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
