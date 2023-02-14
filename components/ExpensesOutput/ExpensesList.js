import { FlatList } from 'react-native';

import ExpenseItem from './ExpenseItem';

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}


//Deze functie bevat een component genaamd ExpensesList dat een
// FlatList gebruikt om de uitgaven weer te geven
function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;