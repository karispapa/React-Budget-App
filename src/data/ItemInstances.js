import React from 'react';
import {IoIosCloseCircleOutline} from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import {connect} from 'react-redux';
import {removeItem} from '../actions/itemsActions';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';



const IncomeItemInstance = (props)=>{

  const removeIncome = ()=>{
    props.dispatch(removeItem({id: props.income.id}))
    props.history.push('/')
  }

return (
                          
  <div className="item clearfix">
      <div className="item__description">
        {props.income.description}
      </div>
      <div className="right clearfix">
          <div className="item__value">{props.income.amount}</div>
          <div className="item__edit">
          <button className="item__edit--btn" >
            <Link to={`/edit/${props.income.id}`}><MdModeEdit className="ion-ios-close-outline"/></Link>
          </button> 
          </div>
          <div className="item__delete">   
          <button className="item__delete--btn" onClick={removeIncome}
          ><IoIosCloseCircleOutline className="ion-ios-close-outline"/></button>          
          </div>
      </div>
  </div>
)};

const ExpenseItemInstance = (props)=>{
 
  const removeExpense = ()=>{
    props.dispatch(removeItem({id: props.expense.id}))
    props.history.push('/')
  }
  return(

  <div className="item clearfix">
      <div className="item__description">
      {props.expense.description}
      </div>
      <div className="right clearfix">
          <div className="item__value">{props.expense.amount}</div>
          <div className="item__edit">
          <div className="item__percentage">21%</div>
          <button className="item__edit--btn" >
            <Link to={`/edit/${props.expense.id}`}><MdModeEdit className="ion-ios-close-outline"/> </Link>
          </button>
          </div>
          <div className="item__delete">
              <button className="item__delete--btn" onClick={removeExpense}
              ><IoIosCloseCircleOutline className="ion-ios-close-outline"/></button>
        </div>
  </div>

  </div>
)};

export const ConnectedIncomeItemInstance = connect()(withRouter(IncomeItemInstance) );
export const ConnectedExpenseItemInstance = connect()(withRouter(ExpenseItemInstance) );