//function to select multiple components and display them dynamically

const displayComponent = (incValue, componentOne, componentTwo) => {
  switch(incValue){
    case 1:{
      return componentOne
      
    }
    case  0: {
      return componentTwo
      
    }

    default: 
    return [componentOne, componentTwo ]  
    

  }
};

export default displayComponent