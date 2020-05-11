import React from 'react';
import Header from './Header';
import ItemList from './ItemList'


const AllExpenses =()=> {
  return (

  <div>
  <Header incValue={0}/>
    <h3>All Expenses</h3>
  <ItemList incValue={0}/>
  
  </div>
)};

export default AllExpenses;