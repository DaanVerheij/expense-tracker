import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  const [sortType, setSortType] = useState('high-to-low');

  const sortedExpenses = expenses.sort((a, b) => {
    if (sortType === 'high-to-low') {
      return b.amount - a.amount;
    } else if (sortType === 'low-to-high') {
      return a.amount - b.amount;
    } else if (sortType === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
  });

  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (sortedExpenses.length > 0) {
    content = <ExpensesList expenses={sortedExpenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterButton, sortType === 'high-to-low' && styles.activeFilterButton]}
          onPress={() => setSortType('high-to-low')}
        >
          <Text style={[styles.filterButtonText, sortType === 'high-to-low' && styles.activeFilterButtonText]}>High to Low</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, sortType === 'low-to-high' && styles.activeFilterButton]}
          onPress={() => setSortType('low-to-high')}
        >
          <Text style={[styles.filterButtonText, sortType === 'low-to-high' && styles.activeFilterButtonText]}>Low to High</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, sortType === 'date' && styles.activeFilterButton]}
          onPress={() => setSortType('date')}
        >
          <Text style={[styles.filterButtonText, sortType === 'date' && styles.activeFilterButtonText]}>Date</Text>
        </TouchableOpacity>
      </View>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 24,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 6,
  },
  filterButtonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  activeFilterButton: {
    backgroundColor: GlobalStyles.colors.primary200,
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  infoText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
    marginVertical: 20,
  },
});

export default ExpensesOutput;