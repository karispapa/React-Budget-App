// Actions for the totals reducer 

export const calculateTotals = (arr)=>{
  let sum = 0;
  arr.forEach(el => {
    sum += parseInt(el.amount) ; 
  });
  return sum;
}

export const getTotalIncome = (incomeArray)=>({
  type: 'GET_TOTAL_INCOME',
  totalIncome: calculateTotals(incomeArray)
});


export const getTotalExpenses = (expenseArray)=>({
  type: 'GET_TOTAL_EXPENSES',
  totalExpenses: calculateTotals(expenseArray)
});