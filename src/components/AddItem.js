import React from 'react';
import { addItem } from '../actions/itemsActions';
import  { connect } from 'react-redux';
import ItemAddForm from './ItemAddForm';
import { withRouter } from 'react-router-dom';


export class AddItem extends React.Component {

  addItem = (item)=>{
    this.props.addItem(item)
    this.props.history.push(`${item.itemType==='inc' ? '/income' : '/expenses'}`)
  }

  render(){
    return(
    
      <div>
      <ItemAddForm onSubmit={this.addItem}/>
      </div>
    
    )
} };


 const mapDispatchToProps = (dispatch)=> ({
   addItem: (item)=>{dispatch(addItem(item))}

 }) 

export default connect(undefined, mapDispatchToProps)(withRouter(AddItem))