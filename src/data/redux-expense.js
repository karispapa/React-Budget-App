import {createStore, combineReducers} from 'redux';
import uuid from 'uuid' // create unique ids for our expense items 

//ADD_EXPENSE
// action generator for add expense
const addItem = ({
  itemType ='inc',
  description = '',
  text = '',
  amount =0,
createdAt = 0}
  ={})=> ({
    type: 'ADD_ITEM',
    expense: {
      id: uuid(),
      itemType,
      description,
      text,
      amount,
      createdAt
    }
});

//REMOVE_EXPENSE
// action generator for remove expense
const removeExpense = ({id} = {})=> ({
  type: 'REMOVE_EXPENSE',
  id
});
//EDIT_EXPENSE
// action generator for edit expense
const editExpense = (id, updates)=> ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
//SET_TEXT_FILTER
// action generator for adding text filter
const addTextFilter = (text = '')=>({
  type: 'ADD_TEXT_FILTER',
  text
});

//SORT_BY_DATE
const sortByDate = ()=>({
  type: 'SORT_BY_DATE',
});

//SORT_BY_AMOUNT
const sortByAmount= ()=>({
  type: 'SORT_BY_AMOUNT',
});

//SET_START_DATE

const setStartDate = (startDate)=> ({
  type: 'SET_START_DATE',
  startDate
});

const setEndDate = (endDate)=> ({
  type: 'SET_END_DATE',
  endDate
});
//SET_END_DATE

const expensesReducerDefault = [];

// Expenses reducer

const expensesReducer = (state = expensesReducerDefault, action)=>{

  switch(action.type){

    case 'ADD_ITEM':
      return [...state, action.expense]

    case 'REMOVE_EXPENSE':
      return state.filter(({id})=> action.id !== id) // filter returns all items in the array that pass the set criteria

     case 'EDIT_EXPENSE': 
     return state.map((expense)=>{
       if(expense.id === action.id){
          return {
            ...expense,
            ...action.updates
          }
       } else{
          return expense
       }
     });
    default: 
      return state
  }
};

// filter reducer 

const filtersReducerDefault = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefault, action)=> {

  switch(action.type){
    case 'ADD_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }; 
      case 'SORT_BY_AMOUNT':
        return {
          ...state,
          sortBy: 'amount'
        }; 
      case 'SET_START_DATE':
        return {
          ...state,
          startDate: action.startDate
        };
        case 'SET_END_DATE':
          return {
            ...state,
            endDate: action.endDate
          };

    default: 
      return state
  }
}

// get visible expenses

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate})=>{
  return expenses.filter((expense)=> {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;

  }).sort((a, b)=> {

    if(sortBy === 'date'){
      return a.createdAt > b.createdAt ? 1 : -1
    } else if (sortBy === 'amount'){
      return a.amount > b.amount ? -1 : 1
    } else {
      return 0
    }
  });
};


// create store
const store = createStore(
  
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
  ); 

  // store.subscribe (()=>{
  //   const state = store.getState();
  //   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  //   console.log(visibleExpenses);
  // });
  
  const displayIncome =  (()=>{
    const state = store.getState();
    let incomeSum = 0;
    const visibleIncome = state.expenses.filter((item)=>{ return item.itemType==='inc'});

    visibleIncome.forEach((income)=> {incomeSum += income.amount})
    console.log(visibleIncome, incomeSum);
  });

  const displayExpenses =  (()=>{
    const state = store.getState();
    let expensesSum = 0;
    const visibleExpenses = state.expenses.filter((item)=>{ return item.itemType==='exp'})

    visibleExpenses.forEach(expense => {
      expensesSum += expense.amount
    });
    console.log(visibleExpenses, expensesSum);
  });
 
  // store.subscribe (()=>{
  //   const state = store.getState();
  //   const visibleExpenses = state.expenses.filter(({itemType})=>{itemType==='exp'})
  //   console.log(visibleExpenses);
  // });
  store.dispatch(addItem({itemType: 'inc', description: 'salary', text: 'Feb', amount: 50000}))
  store.dispatch(addItem({itemType: 'inc', description: 'sales', text: 'Clothes', amount: 10000}))
  store.dispatch(addItem({itemType: 'exp', description: 'rent', text: 'Feb', amount: 4000}))
  store.dispatch(addItem({itemType: 'exp', description: 'lunch', text: 'Chicken', amount: 2000}))

  
  displayIncome()
  displayExpenses()
  