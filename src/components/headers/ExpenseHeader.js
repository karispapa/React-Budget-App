import React from 'react';


export default class ExpenseHeader extends React.Component{
  
  render (){
  return(
  <div className="budget__expenses clearfix">
    <div className="budget__expenses--text">Expenses</div>
    <div className="right clearfix">
        <div className="budget__expenses--value">{
          this.props.expensesTotal >0 ? this.props.expensesTotal: '---'}
        </div>
        <div className="budget__expenses--percentage">{
          this.props.percentage > 1 ? this.props.percentage: '---'}%
        </div>
    </div>
  </div>  
)
}
};

