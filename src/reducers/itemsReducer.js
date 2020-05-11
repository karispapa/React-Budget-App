// Reducer for income and expense items 
const itemsReducerDefault = []

const itemsReducer = (state=itemsReducerDefault, action)=> {

  switch(action.type){
    case 'ADD_ITEM':
      return [...state, action.item]

    case 'EDIT_ITEM':
      return state.map((item)=>{
        if(item.id=== action.id){
          return {...item, ...action.updates}
          
        }else {
          return item
        }
      })  
    
    case 'REMOVE_ITEM':
      return state.filter(({id})=> id !== action.id)
      
    default: return state
  }
};


export default itemsReducer