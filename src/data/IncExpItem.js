import React from 'react';
import {ConnectedIncomeItemInstance, ConnectedExpenseItemInstance} from '../components/ItemInstances'

export const IncomeItem = (props)=>{
  return(
    <div>
      <div className="income">
        <h2 className="icome__title">Income</h2>
        
          <div className="income__list">
          {props.allIncome.map((income)=> <ConnectedIncomeItemInstance 
          key={income.id} income={income}/> )}   
                 
          </div>
        </div>
       
    </div>
  )
};


export const ExpenseItem = (props)=>{
  return(
    <div>
      <div className="expenses">
        <h2 className="expenses__title">Expenses</h2>
        
        <div className="expenses__list">
        {props.allExpenses.map((expense)=> <ConnectedExpenseItemInstance 
          key={expense.id} expense={expense}/> )}                  
        </div>
      </div>
</div>
  )
};