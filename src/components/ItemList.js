import React from 'react';
import displayComponent from '../js/displayComponent'
import IncomeItem from './itemsLists/IncomeItem';
import ExpenseItem from './itemsLists/ExpenseItem';


export default class ItemList extends React.Component{

  render(){

  return (
    <div className="container clearfix">
      {displayComponent(this.props.incValue, <IncomeItem key='inc'/>, <ExpenseItem key='exp'/> )}
    </div>
    
  )
}
};
