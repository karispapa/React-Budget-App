import React from 'react';


export default class IncomeHeader extends React.Component {
  
  render (){

    return(
  <div className="budget__income clearfix">
    <div className="budget__income--text">Income</div>
    <div className="right">
        <div className="budget__income--value">{
          this.props.incomeTotal > 0 ? this.props.incomeTotal: '---'}
        </div>
        <div className="budget__income--percentage">&nbsp;</div>
    </div>
  </div>
)}
};

