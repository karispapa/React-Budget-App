import { createStore, combineReducers} from 'redux';
import itemsReducer from '../reducers/itemsReducer';
import filtersReducer from '../reducers/filtersReducer';
import totalsReducer from '../reducers/totalsReducer'
import {loadState} from '../localStorage'

const persistedState = loadState();
const combineReducer = combineReducers({
      items: itemsReducer,
      filters: filtersReducer,
      totals: totalsReducer
})

export default ()=>{

  const store = createStore(

    combineReducer,
    persistedState, // get data from local storage 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()// enable redux devtools 
  );

  return store;
}





