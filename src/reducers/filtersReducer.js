// Reducer for the filters 

const filtersReducerDefaults = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const filtersReducer  = (state=filtersReducerDefaults, action)=>{

  switch(action.type){
    default: return state;
  }
};

export default filtersReducer;