import React from 'react';
import IncomeItemInstance from '../itemInstances/IncomeItemInstance';
import {connect} from 'react-redux';

export class IncomeItem extends React.Component {

  render() {
  return(
    <div>
      <div className="income">
        <h2 className="icome__title">Income</h2>
        
          <div className="income__list">
          {this.props.allIncome.map((income)=> <IncomeItemInstance 
          key={income.id} income={income}/> )}   
                 
          </div>
        </div>
       
    </div>
  )
}
};

const mapStateToProps = (state)=>({
  allIncome: state.items.filter(({itemType})=> itemType==='inc')
})

export default connect(mapStateToProps)(IncomeItem)