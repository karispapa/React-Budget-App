import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes /AppRouter';
import './styles/style.css';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
// import storeSynchronize from 'redux-localstore';  
import { saveState} from './localStorage'
import arraySplit from './js/arraySplit';
import {getTotalIncome, getTotalExpenses, calculateTotals} from './actions/totalsActions'


const store = configureStore();

// store.subscribe(()=>{
//   store.dispatch(getTotalIncome(arraySplit(store.getState().items).income))
//   store.dispatch(getTotalExpenses(arraySplit(store.getState().items).expenses))
// })


store.subscribe(()=>{
  saveState(store.getState())
  // console.log(store.getState())
// console.log(store.getState().items)
// console.log(arraySplit(store.getState().items))
// console.log(calculateTotals(arraySplit(store.getState().items).income))
// console.log(calculateTotals(arraySplit(store.getState().items).expenses))
})




const jsx = (
  <Provider store={store}>
  
    <AppRouter/>
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'))