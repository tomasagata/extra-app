import { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';

import ScreenTemplate from '../components/ScreenTemplate';
import { useDeleteExpense, useTransactionList } from '../hooks/transactions';
import FilterButton from '../components/Filter';
import ExpenseListItem from '../components/ExpenseListItem';
import AddExpenseButton from '../components/AddExpenseButton';
import DepositListItem from '../components/DepositListItem';


const TableScreen = ({navigation, route}) => {
  const [ filterData, setFilterData ] = useState({});

  const { isPending: isPendingExpenses, data: transactions, isRefetching, refetch } = useTransactionList(filterData);
  const { isPending: isPendingDelete, mutate: deleteExpense } = useDeleteExpense();
  const loading = isPendingExpenses || isPendingDelete;

  const handleEditExpense = (item) => {
    navigation.navigate("Add Expense", {
      screen: "expense-modify/categories-list",
      params: {
        selectedCategory: item.category,
        selectedItem: item
      },
    });
  };


  return (
    <ScreenTemplate loading={loading}>
      <ScreenTemplate.Logo/>

      <ScreenTemplate.Content>
        <AddExpenseButton/>

        <FilterButton onDone={setFilterData} />

        <ScrollView 
          style={{height: 450}} 
          contentContainerStyle={styles.scrollviewContentContainer}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch}/>
          }
        >
          
          { transactions?.map((transaction, index) => {
            if (transaction.type == 'expense') {
              return (
                <ExpenseListItem 
                  key={index}
                  data={transaction}
                  onEdit={handleEditExpense}
                  onDelete={deleteExpense}
                />  
              )
            } else {
              return (
                <DepositListItem 
                  key={index}
                  data={transaction}
                />
              )
            }
            })
          }

        </ScrollView>
      </ScreenTemplate.Content>
      
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({

  scrollviewContentContainer: {
    display: 'flex',
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#e1e1e8', // Table background color
    borderWidth: 1,
    borderColor: '#AEB4E7', // Border color
  },

});

export default TableScreen;
