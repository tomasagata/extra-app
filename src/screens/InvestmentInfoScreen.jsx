import React from "react";
import { Text, TouchableOpacity } from "react-native";

import ScreenTemplate from "../components/ScreenTemplate";
import { ListItem, Icon } from "@rneui/themed";
import { ProgressChart } from "react-native-chart-kit";
import { ScrollView } from "react-native";

const iconFactory = (id) => {
  switch (id) {
    case 1:
      return "aircraft"
    case 2:
      return "drink"
    case 3:
      return "key"
    case 4:
      return "shopping-cart"
    case 5:
      return "clapperboard"
    case 6:
      return "squared-plus"
    case 7:
      return "man"
    case 8:
      return "open-book"
    default:
      return "credit"
  }
};

const InvestmentInfoScreen = ({navigation, route}) => {

  const handleBack = async () => {
    navigation.goBack();
  };

  return (
    <ScreenTemplate >

      <ScreenTemplate.Content style={{paddingHorizontal: 15}}>
        <ScrollView>
          <Text style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 28,
          fontWeight: '500',
          color: '#333',
          marginBottom: 30,
          marginTop: 30,
          }}>{route.params.selectedInvestment.name}</Text>

          <Text>Category</Text>
          <ListItem>
              <Icon name={iconFactory(route.params.selectedInvestment.category.iconId)} type="entypo" />
              <ListItem.Content>
                  <ListItem.Title>{route.params.selectedInvestment.category.name}</ListItem.Title>
              </ListItem.Content>
          </ListItem>

          <Text>Starting date</Text>
          <ListItem>
              <Icon name="arrow-expand-right" type="material-community" />
              <ListItem.Content>
                  <ListItem.Title>{route.params.selectedInvestment.downPaymentTimestamp.toLocaleString()}</ListItem.Title>
              </ListItem.Content>
          </ListItem>

          <Text>Down payment amount</Text>
          <ListItem>
              <Icon name="credit" type="entypo" />
              <ListItem.Content>
                  <ListItem.Title>{route.params.selectedInvestment.downPaymentAmount}</ListItem.Title>
              </ListItem.Content>
          </ListItem>

          <Text>Deposit amount</Text>
          <ListItem>
            <Icon name="credit" type="entypo" />
            <ListItem.Content>
              <ListItem.Title>{route.params.selectedInvestment.depositAmount}</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <Text>Deposit interval</Text>
          <ListItem>
            <Icon name="credit" type="entypo" />
            <ListItem.Content>
              <ListItem.Title>{route.params.selectedInvestment.depositIntervalInDays + " days"}</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <TouchableOpacity style={{
            backgroundColor: 'grey',
            borderRadius: 5,
            padding: 10,
            alignItems: 'center',
          }} onPress={handleBack}>
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScreenTemplate.Content>
    </ScreenTemplate>
  );
};

export default InvestmentInfoScreen;
