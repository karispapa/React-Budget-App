import React from 'react';
import Header from './Header';
import ItemList from './ItemList'



const AllIncome =()=> {
  return(

  <div>
  <Header incValue={1}/>
    <h3>All Income</h3>
  <ItemList incValue={1}/>  
  
  </div>
)};

export default AllIncome;