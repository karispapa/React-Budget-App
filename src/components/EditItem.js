import React from 'react';
import {connect} from 'react-redux';
import ItemAddForm from './ItemAddForm';
import {editItem} from '../actions/itemsActions'


const EditItem = (props)=>{
  return(
    <div className="edit_Item">
    <h3>Edit your Budget Item Here</h3>
    <ItemAddForm
      item={props.item}
      onSubmit={(item)=>{
        props.dispatch(editItem(props.item.id, item))
        props.history.push('/')
      }}
    />
    </div>
  )
};

const mapStateToProps = (state, props)=>{

  return {
    item: state.items.find(el =>el.id === props.match.params.id)
  }
};


export default connect(mapStateToProps)(EditItem);
