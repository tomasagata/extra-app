import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CategorySelectionScreen from '../screens/CategorySelectionScreen';
import NewCategoryScreen from '../screens/NewCategoryScreen';
import InvestmentsScreen from '../screens/InvestmentsScreen';
import AddInvestmentScreen from '../screens/AddInvestmentScreen';
import InvestmentInfoScreen from '../screens/InvestmentInfoScreen';
import InvestmentGraphsScreen from '../screens/InvestmentGraphsScreen';

const Stack = createStackNavigator();

const InvestmentStack = (props) => {

  return (
    <Stack.Navigator initialRouteName='investment-list'>
      <Stack.Screen 
        name='investment-list'
        component={InvestmentsScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='investment-add'
        component={AddInvestmentScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='investment-info'
        component={InvestmentInfoScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="investment-add/categories-list"
        component={CategorySelectionScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="investment-add/categories-add"
        component={NewCategoryScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="investment-chart"
        component={InvestmentGraphsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default InvestmentStack;