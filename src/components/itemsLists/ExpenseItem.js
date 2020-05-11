import React from 'react';
import ExpenseItemInstance from '../itemInstances/ExpenseItemInstance'
import {connect} from 'react-redux'

export class ExpenseItem extends React.Component{

  render (){
  return(
    <div>
      <div className="expenses">
        <h2 className="expenses__title">Expenses</h2>
        
        <div className="expenses__list">
        {this.props.allExpenses.map((expense)=> <ExpenseItemInstance 
          key={expense.id} expense={expense}/> )}                  
        </div>
      </div>
</div>
  )
}
};

const mapStateToProps = (state)=>({
  allExpenses: state.items.filter(({itemType})=> itemType==='exp')
})

export default connect(mapStateToProps)(ExpenseItem)