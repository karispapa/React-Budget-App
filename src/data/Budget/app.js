
// importScripts('accounting.js');

// console.log(accounting.formatMoney('23510'))

// BUDGET CONTROLLER 
let budgetController = (function(){
// We will have many instances of expenses rather than income and the best way is to  do a function constructor
// for the income and expense
  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;

  };

    // Create a method to calculate the percentage of each instance of the expense fxn constructor 
  Expense.prototype.calcPercentage = function(totalIncome){
    if(totalIncome > 0){
      this.percentage = Math.round((this.value/totalIncome)*100)
    }else{
      this.percentage = -1;
    }
  };
  // return the calculated percentage
  Expense.prototype.getPercentage = function(){
    return this.percentage;
  };

  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;

  };

  let calculateTotal = function(type){
    let sum = 0;
    // Loop through the array, and get the sum of the values 
    data.allItems[type].forEach(function(cur){
      sum += cur.value;
    })
    data.totals[type] = sum;
  }

  // Array is the best data structure to store the difrrent values of income and expenses 
  // we create an object and lets us grouo the the items
  var data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1 // -1 declares an item as non-existent
  };

  // create new items, add new items, returns a new item 
  return{
    addItem: function(type, des, val){
      let newItem, ID;
      if(data.allItems[type].length > 0){
        //current id = previous id of the item in the array+1
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else{
        ID = 0;
      }

      // create a new item based on 'exp' or 'inc' type
      if(type === 'exp'){
        newItem = new Expense(ID, des, val);
      } else if(type === 'inc'){
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },

    calculatePercentages: function(){
      // return the percentages of the expense items compared to total income

      data.allItems.exp.forEach(function(cur){
        cur.calcPercentage(data.totals.inc);
      })
    },

    getPercentages: function(){
      // allPerc is an array holding the percentages of the expense items 
      let allPerc = data.allItems.exp.map(function(cur){
        return cur.getPercentage();
      })
      return allPerc;
    },

    calculateBudget: function(){

      // Get the sum of all incomes and expenses
      calculateTotal('inc');
      calculateTotal('exp');

      // Calculate the budget( income - expense)
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the % of our income spent, only when we have an income
      if(data.totals.inc > 0){
        data.percentage = Math.round((data.totals.exp / data.totals.inc)* 100)
      } else{
        data.percentage = -1;
      }

      
    },

    deleteItem: function(type, id){
     let ids, index

     // create an array of ids in the inc and exp arrays
     ids = data.allItems[type].map(function(current){
       return current.id
     });

     index = ids.indexOf(id);

     // if the id is found 
     if(index !== -1){
       data.allItems[type].splice(index, 1);
     }
    },

    getBudget: function(){
      return{
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },
    testing: function(){
      console.log(data);
    }
  }

})();











//UI CONTROLLER
let UIController = (function(){

  let DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensePercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
    

  }

  let formatNumber = function(num, type){
    let numSlipt, int, dec
    
    num = Math.abs(num); // removes the sign on the number 
    num = num.toFixed(2); // a method of the number prototype, adds 2 decimal places 
    
    numSlipt = num.split('.');

    int = numSlipt[0];
    if(int.length > 3){
      int = int.substr(0, int.length - 3) + ',' + int.substr( int.length - 3, 3)// 23510
    }


    dec = numSlipt[1]

    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec

  }
  return{
    getInput: function(){
      return{
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      };
    },
    // add new item to the user interface
    addListItem: function(obj, type){
      let html, newHtml, element;
      // create html strings with placeholder text
      if(type === 'inc'){
        element = DOMStrings.incomeContainer;
       html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

      } else if(type === 'exp'){
        element = DOMStrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      // replace the placeholder text with some actual data'

      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type))

      //Insert the html into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: function(selectorID){
      var el
      el = document.getElementById(selectorID);
      el.parentNode.removeChild(el)

    },

    clearFields: function(){
      var fields, fieldsArr
        // this querySelector all returns a list
      fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);

      // preparing list to use array methods stored in the Array prototype
      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach( function(current, index, array){
        current.value = "";

      fieldsArr[0].focus();
      });
    },

    displayBudget: function(obj){
      let type;

      obj.budget > 0 ? type = 'inc' : 'exp'

      document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type)
      document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc')
      document.querySelector(DOMStrings.expensesLabel).textContent =  formatNumber(obj.totalExp, 'exp')

      if(obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage
      } else{
        document.querySelector(DOMStrings.percentageLabel).textContent = '---'

      }
    },

    displayPercentages: function(percentages){
      let fields = document.querySelectorAll(DOMStrings.expensePercLabel)

      let NodeListForeach = function(list, callback){
        for(var i = 0; i < list.length; i++){
          callback(list[i], i)
        }
      };

      NodeListForeach(fields, function(current, index){
        if(percentages[index] > 0){
          current.textContent = percentages[index] + '%';
        }else{
          current.textContent = '---'
        }
      })
    },

    displayDate: function(){
      let now, year, months, month

      now = new Date(); // returns(year, month, day)
      // 
      year = now.getFullYear();
      month = now.getMonth(); // returns a number 
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'];
      document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year
    },
    

    // to make the DOMStrings object visible, we expose it to the public
    getDomStrings: function(){
      return DOMStrings;
    }
  };

  
})();

// console.log(accounting.formatMoney(23510))










// GLOBAL CONTROLLER 
let controller = (function(budgetCrrl, UIctrl){
  
  let setupEventListeners = function(){
    
    let DOM = UIctrl.getDomStrings();

      // listen to the click of button to add a field
    document.querySelector(DOM.inputBtn).addEventListener('click', controllerAddItem);

    // listen to pressing of Enter key
    document.addEventListener('keypress', function(event){
      if(event.keyCode === 13 || event.which === 13){// which is for older browsers
        controllerAddItem();
      };
    })

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  };

  let updateBudget = function(){
    // 1. calculate the budget
    budgetCrrl.calculateBudget();
    //2. Return budget
    let budget = budgetController.getBudget();
    // 5. Display the budget in the UI 
    UIctrl.displayBudget(budget);
  };

  let updatePercentages = function(){
    // 1. Calculate the percentages 
    budgetCrrl.calculatePercentages();
    // 2. Read the percentages from the budget controller 
    let percentages = budgetCrrl.getPercentages();
    // 3.Update the UI with the new percentage
    UIctrl.displayPercentages(percentages);
    
  }

  let controllerAddItem = function(){

    // 1. Get the field input data (UI controller)
    let input = UIctrl.getInput();
    if(input.description !== "" && !isNaN(input.value) && input.value >0){
      // 2. Add the item to the budget controller
    let newItem = budgetCrrl.addItem(input.type, input.description, input.value);
    
    // 3. Add the item to the UI
    UIctrl.addListItem(newItem, input.type);

    //4. clear fields
    UIctrl.clearFields(); 

    // 4. calculate the budget
    updateBudget();

    // 5. Calculate the percentages 
    updatePercentages();

    };

  };

  let ctrlDeleteItem = function(event){
    let itemID, splitID, type, ID

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(itemID){
      splitID = itemID.split('-');
      type = splitID[0]
      ID = parseInt(splitID[1])

      // 1. Delete the item in the data structure
      budgetCrrl.deleteItem(type, ID)
      // 2. Delete the item from the UI
      UIctrl.deleteListItem(itemID)
      // 3. Update budget and show in the UI
      updateBudget();

      // 4. Update the percentages 
      updatePercentages();

    }


  };

  return {
    init: function(){
      console.log('Application started');
      UIctrl.displayDate()
      UIctrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      return setupEventListeners();
     
    }

  };

  

  
}) (budgetController, UIController);

// call the initialize method to initialize the application

controller.init();
