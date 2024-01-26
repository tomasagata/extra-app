import React from "react";
import { Text } from "react-native";

import ScreenTemplate from "../components/ScreenTemplate";
import BackButton from "../components/BackButton";
import BudgetList from "../components/BudgetList";


const InvestmentsScreen = ({navigation, route}) => {

  const handleBudgetSelection = (budget) => {
    navigation.navigate("investment-info", {
      selectedBudget: budget
    });
  };

  const handleAddBudget = () => {
    navigation.navigate("investment-add/categories-list");
  };

  return(
    <ScreenTemplate >
      <ScreenTemplate.Logo />

      <ScreenTemplate.Content style={{paddingHorizontal: 15}}>

        <Text style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 28,
          fontWeight: '500',
          color: '#333',
          marginBottom: 30,
          marginTop: 30,
        }}>Budgets</Text>

        <BudgetList 
          onAdd={handleAddBudget}
          onSelection={handleBudgetSelection}
        />

        <BackButton />

      </ScreenTemplate.Content>
    </ScreenTemplate>
  );
};

export default InvestmentsScreen;
