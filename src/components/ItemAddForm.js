import React from 'react';

export default class ItemAddForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      itemType: props.item ? props.item.itemType: 'inc',
      description: props.item ? props.item.description: '',
      amount: props.item ? props.item.amount:  0,
      error: ''
    }
  }

  onItemTypeChange = (e)=>{
    const itemType = e.target.value;
    this.setState(()=>({itemType}))
  }

  onDescriptionChange = (e)=>{
    const description = e.target.value;
    this.setState(()=>({description}))
  } 
  
  onAmountChange = (e)=>{
    const amount = e.target.value;
    this.setState(()=>({amount}))
  }

  onSubmitForm = (e)=>{
    e.preventDefault();

    this.props.onSubmit({
      itemType: this.state.itemType,
      description: this.state.description,
      amount: this.state.amount
    })
  }
 

  render(){
    return(
      <div className='add'>
      <form onSubmit={this.onSubmitForm} className="add__container">
      <select className="add__type" 
        value={this.state.itemType}
        onChange={this.onItemTypeChange}
        required >
          <option value="inc" >Income</option>
          <option value="exp">Expense</option>
      </select>

      <input type="text" className="add__description"
        value={this.state.description}
        onChange={this.onDescriptionChange}
        placeholder="Add description" 
        required
      />

      <input type="number" className="add__value" 
        value={this.state.amount}
        onChange={this.onAmountChange}
        required placeholder="Value" 
        required
      />
      <button className="add__btn--submit" type="submit">
        {this.props.item ? (this.props.item.itemType==='inc' ? 'Edit Income': 'Edit Expense'): 
          (this.state.itemType==='inc' ? 'Add Income' : 'Add Expense')}
      </button>
  </form>
      </div>
    )
  }
}