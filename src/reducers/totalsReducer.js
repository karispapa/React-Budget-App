
const defaultTotalsReducer  = {
  totalIncome: 0,
  totalExpenses: 0
}

const totalsReducer = (state=defaultTotalsReducer, action)=>{
  switch(action.type){
    case 'GET_TOTAL_INCOME':
      return {...state, totalIncome: action.totalIncome}

    case 'GET_TOTAL_EXPENSES':
      return {...state, totalExpenses: action.totalExpenses}

    default: 
      return state
  }
}

export default totalsReducer;