import { createContext, useReducer } from 'react';

// dummy uitgaven die gelijk worden getoond, kunnen inprincipe weg worden gehaald.
const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Nike schoenen',
    amount: 119.99,
    date: new Date('2022-12-19'),
  },
  {
    id: 'e2',
    description: 'Kleding van Zalando',
    amount: 89,
    date: new Date('2023-01-05'),
  },
  {
    id: 'e3',
    description: 'Booschappen: 1 feb - 7 feb',
    amount: 125.99,
    date: new Date('2023-02-01'),
  },
  {
    id: 'e4',
    description: 'Een boek',
    amount: 14.99,
    date: new Date('2023-02-12'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

// De add, update en delete functie
function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;