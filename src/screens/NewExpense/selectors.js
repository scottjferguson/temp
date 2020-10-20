export const getCategories = (state) =>
  state.categories.categories.map((cat) => {
    return { Id: cat.id, Name: cat.name, Value: cat.id };
  });
export const isAddExpenseStarted = (state) =>
  state.newExpense.addExpenseStarted;
export const isAddExpenseSuccess = (state) =>
  state.newExpense.addExpenseSuccess;
export const isAddExpenseError = (state) => state.newExpense.addExpenseError;
