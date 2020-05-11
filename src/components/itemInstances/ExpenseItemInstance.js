import React from 'react';
import {IoIosCloseCircleOutline} from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import {connect} from 'react-redux';
import {removeItem} from '../../actions/itemsActions';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';


export class ExpenseItemInstance extends React.Component{
 
  removeExpense = ()=>{
    this.props.removeItem(this.props.expense.id)
    this.props.history.push('/')
  };

  render(){
  return(

  <div className="item clearfix">
      <div className="item__description">
      {this.props.expense.description}
      </div>
      <div className="right clearfix">
          <div className="item__value">{this.props.expense.amount}</div>
          <div className="item__edit">
          <div className="item__percentage">21%</div>
          <button className="item__edit--btn" >
            <Link to={`/edit/${this.props.expense.id}`}><MdModeEdit className="ion-ios-close-outline"/> </Link>
          </button>
          </div>
          <div className="item__delete">
              <button className="item__delete--btn" onClick={this.removeExpense}
              ><IoIosCloseCircleOutline className="ion-ios-close-outline"/></button>
        </div>
  </div>

  </div>
)}
};

const mapDispatchToProps = (dispatch)=>({
  removeItem: (id)=> dispatch(removeItem({id}))
});

export default connect(undefined, mapDispatchToProps)(withRouter(ExpenseItemInstance) );