import React from "react";
import { Text } from "react-native";

import ScreenTemplate from "../components/ScreenTemplate";
import BackButton from "../components/BackButton";
import InvestmentList from "../components/InvestmentList";


const InvestmentsScreen = ({navigation, route}) => {

  const handleInvestmentSelection = (investment) => {
    navigation.navigate("investment-info", {
      selectedInvestment: investment
    });
  };

  const handleAddInvestment = () => {
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
        }}>Investments</Text>

        <InvestmentList 
          onAdd={handleAddInvestment}
          onSelection={handleInvestmentSelection}
        />

        <BackButton />

      </ScreenTemplate.Content>
    </ScreenTemplate>
  );
};

export default InvestmentsScreen;
