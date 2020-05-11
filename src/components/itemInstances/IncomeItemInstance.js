import React from 'react';
import {IoIosCloseCircleOutline} from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import {connect} from 'react-redux';
import {removeItem} from '../../actions/itemsActions';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';



export class IncomeItemInstance extends React.Component{

  removeIncome = ()=>{
    this.props.removeItem(this.props.income.id)
    this.props.history.push('/')
  }

render (){
return (
                          
  <div className="item clearfix">
      <div className="item__description">
        {this.props.income.description}
      </div>
      <div className="right clearfix">
          <div className="item__value">{this.props.income.amount}</div>
          <div className="item__edit">
          <button className="item__edit--btn" >
            <Link to={`/edit/${this.props.income.id}`}><MdModeEdit className="ion-ios-close-outline"/></Link>
          </button> 
          </div>
          <div className="item__delete">   
          <button className="item__delete--btn" onClick={this.removeIncome}
          ><IoIosCloseCircleOutline className="ion-ios-close-outline"/></button>          
          </div>
      </div>
  </div>
)}
};

const mapDispatchToProps = (dispatch)=>({
  removeItem: (id)=> dispatch(removeItem({id}))
})

export default connect(undefined, mapDispatchToProps)(withRouter(IncomeItemInstance) );