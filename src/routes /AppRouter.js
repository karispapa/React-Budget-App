import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import BudgetDashboard from '../components/BudgetDashboard';
import AllExpenses from '../components/AllExpenses';
import AllIncome from '../components/AllIncome';
import EditItem from '../components/EditItem';


const AppRouter = ()=> (


  <BrowserRouter>
   <div>
    <Switch>
    <Route path="/" component={BudgetDashboard} exact={true}/>
    <Route path="/expenses" component={AllExpenses}/>
    <Route path="/income" component={AllIncome}/>
    <Route path="/edit/:id" component={EditItem}/>

    </Switch>

   </div>
  </BrowserRouter>
)


export default AppRouter;