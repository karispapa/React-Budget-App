import React from 'react'



export default class Count extends React.Component {

  state = {
    count: 0
  }

  

  incrementCount = ()=> {
    this.setState((prevState)=>({count: prevState.count + 1}))
  }

  decrementCount = ()=> {
    this.setState((prevState)=>({count: prevState.count - 1}))
  }
  
  render (){
    return (
      <div>
        <h2>{this.state.count}</h2>
        <button onClick={this.incrementCount}>Increment</button>
        <button onClick={this.decrementCount}>Decrement</button>
      
      </div>
    )
  };

};