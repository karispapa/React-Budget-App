import uuid from 'uuid';

// action generators for the items reducer

// Add Item 

export const addItem = ({
  itemType = 'inc',
  description = '',
  amount = 0
}={})=> ({
  type: 'ADD_ITEM',
  item: {
    id: uuid(),
    itemType,
    description,
    amount
  }
});

// Edit Item 
export const editItem = (id, updates)=>({
  type: 'EDIT_ITEM',
  id,
  updates
})


// Remove Item 
export const removeItem = ({id = {}})=>({
  type: 'REMOVE_ITEM',
  id
});