
export default (arr)=> {
  return {
    income: arr.filter((el)=> el.itemType === 'inc'),
    expenses: arr.filter((el)=> el.itemType === 'exp'),
  }
};