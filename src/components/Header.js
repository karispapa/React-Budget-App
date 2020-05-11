import React from 'react';
import moment from 'moment';
import displayComponent from '../js/displayComponent';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import {calculateTotals} from '../actions/totalsActions';
import IncomeHeader from './headers/IncomeHeader'
import ExpenseHeader from './headers/ExpenseHeader'


export class Header extends React.Component {

 state = {
    budget: this.props.incomeTotal - this.props.expensesTotal,
    perc: ((this.props.expensesTotal/this.props.incomeTotal)*100).toFixed(2)
  }

  // componentDisplay = ()=>{
  //   displayComponent(this.props.incValue, 
  //     <IncomeHeader incomeTotal={this.props.incomeTotal} key='inc'/>,
  //     <ExpenseHeader expensesTotal={this.props.expensesTotal} percentage={this.state.perc} key='exp'/>)
  // }

render (){
  return (
 
    <div className="top">
    <div className="budget">
    <div className='navlink-container'>
      <NavLink className='navlink' to='/' exact={true}>Dashboard</NavLink>
      <NavLink className='navlink' to='/income'>Income</NavLink>
      <NavLink className='navlink' to='/expenses' >Expenses</NavLink>
    </div>
        <div className="budget__title">
            Available Budget on {moment().format("Do MMM YYYY")}
        </div>
        
        <div className="budget__value">Ksh: {this.state.budget>0 ? this.state.budget: '---'}</div>
       {displayComponent(this.props.incValue, 
        <IncomeHeader incomeTotal={this.props.incomeTotal} key='inc'/>,
        <ExpenseHeader expensesTotal={this.props.expensesTotal} percentage={this.state.perc} key='exp'/>)}
                         
    </div>
  </div>
  )
}
    
  };

  const mapStateToProps = (state)=>{
    return{
      incomeTotal: calculateTotals(state.items.filter((item)=> item.itemType==='inc' )),
      expensesTotal: calculateTotals(state.items.filter((item)=> item.itemType==='exp' )),
  }
}

export default connect(mapStateToProps)(Header);