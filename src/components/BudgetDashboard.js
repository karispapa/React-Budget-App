import React from 'react';
import Header from './Header';
import ItemList from './ItemList';
import AddItem from './AddItem'


const BudgetDashboard =()=> (

  <div>
  <Header/>
    <h3>Budget Dashboard: All income and expenses </h3>
  <AddItem/>
  <ItemList/>
  

  
  </div>
);

export default BudgetDashboard;