import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import DatePicker from 'react-native-date-picker';

import ScreenTemplate from '../components/ScreenTemplate';
import { AppInput } from '../components/AppInput';
import { useInvestmentCreationForm } from '../hooks/investments';

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


const AddInvestmentScreen = ({navigation, route}) => {
  const [name, setName] = React.useState("");
  const [downPaymentAmount, setDownPaymentAmount] = React.useState("");
  const [downPaymentTimestamp, setDownPaymentTimestamp] = React.useState(new Date());
  const [depositAmount, setDepositAmount] = React.useState("");
  const [maxNumberOfDeposits, setMaxNumberOfDeposits] = React.useState("");
  const [depositIntervalInDays, setDepositIntervalInDays] = React.useState("");


  const [nameHasError, setNameError] = React.useState(false);
  const [amountHasError, setAmountError] = React.useState(false);

  const [startDateOpen, setStartDateOpen] = React.useState(false);
  
  const { isPending: loading, mutate: sendForm } = useInvestmentCreationForm();


  const handleSubmit = async () => {
    if(checkForErrors()){
      Alert.alert("Validation error", "Please correct selected fields and try again.");
      return;
    }
    let newInvestment = {
      name, 
      downPaymentAmount,
      downPaymentTimestamp,
      depositAmount,
      maxNumberOfDeposits,
      depositIntervalInDays,
      category: route.params.selectedCategory.name,
      iconId: route.params.selectedCategory.iconId
    };

    sendForm(newInvestment);
  };

  const handleBack = async () => {
    navigation.goBack();
  };

  const checkForErrors = () => {
    let nameErr = checkNameError();
    let amountErr = checkAmountError();
    return nameErr || amountErr;
  };

  const checkNameError = () => {
    let regex = /^[A-Za-z\d\s]+$/;
    let isValid = regex.test(name);
    setNameError(!isValid);
    return !isValid;
  };

  const checkAmountError = () => {
    let regex = /^[\d]{1,12}((\.)(\d){1,2})?$/;
    let isValid = regex.test(downPaymentAmount);
    setAmountError(!isValid);
    return !isValid;
  };

  return (
    <ScreenTemplate loading={loading}>
      <ScreenTemplate.Scrollable style={{paddingHorizontal: 15}}>
        <Text style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 28,
          fontWeight: '500',
          color: '#333',
          marginBottom: 30,
          marginTop: 30,
        }}>Create Investment</Text>

        <Text>Category</Text>
        <ListItem containerStyle={{marginBottom: 20}}>
          <Icon name={iconFactory(route.params.selectedCategory.iconId)} type="entypo" />
          <ListItem.Content>
            <ListItem.Title>{route.params.selectedCategory.name}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        
        <Text>Name</Text>
        <AppInput.Budget
          value={name}
          onChangeText={setName}
          errorMessage={nameHasError? "Concept may only contain letters or numbers" : null}
          onEndEditing={checkNameError}
        />

        <Text>Down Payment Amount</Text>
        <AppInput.Amount
          value={downPaymentAmount}
          onChangeText={setDownPaymentAmount}
          errorMessage={amountHasError? "Amount must be positive and limited to cent precision" : null}
          onEndEditing={checkAmountError}
        />

        <Text>Starting date</Text>
        <AppInput.Date
          value={downPaymentTimestamp}
          onPress={() => setStartDateOpen(true)}
        />

        <Text>Deposit Amount</Text>
        <AppInput.Amount
          value={depositAmount}
          onChangeText={setDepositAmount}
          errorMessage={amountHasError? "Amount must be positive and limited to cent precision" : null}
          onEndEditing={checkAmountError}
        />

        <Text>Number of deposits</Text>
        <AppInput.Amount
          value={maxNumberOfDeposits}
          onChangeText={setMaxNumberOfDeposits}
          errorMessage={amountHasError? "Amount must be positive and limited to cent precision" : null}
          onEndEditing={checkAmountError}
        />

        <Text>Deposit interval (days)</Text>
        <AppInput.Amount
          value={depositIntervalInDays}
          onChangeText={setDepositIntervalInDays}
          errorMessage={amountHasError? "Amount must be positive and limited to cent precision" : null}
          onEndEditing={checkAmountError}
        />

        <DatePicker
          modal
          mode="date"
          open={startDateOpen}
          date={downPaymentTimestamp}
          onConfirm={(selectedDate) => {
            setStartDateOpen(false);
            setDownPaymentTimestamp(selectedDate);
          }}
          onCancel={() => {
            setStartDateOpen(false);
          }}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
          <Text style={styles.cancelButtonText}>Back</Text>
        </TouchableOpacity>
        
      </ScreenTemplate.Scrollable>

    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: '#E86DC3',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 1,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'grey',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddInvestmentScreen;
