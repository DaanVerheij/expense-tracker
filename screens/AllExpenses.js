import { useContext } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';


function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  return (
    //ExpensesOutput is een component die alle expenses aanroept, als er geen expenses zijn wordt de fallbackText laten zien.
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;