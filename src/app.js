import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes /AppRouter';
import './styles/style.css';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { saveState} from './localStorage';


const store = configureStore();

store.subscribe(()=>{
  saveState(store.getState())
})

const jsx = (
  <Provider store={store}>
  
    <AppRouter/>
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'))