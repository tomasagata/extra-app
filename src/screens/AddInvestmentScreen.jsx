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
  const [depositStartTimestamp, setDepositStartTimestamp] = React.useState(new Date());
  const [depositAmount, setDepositAmount] = React.useState("");
  const [maxNumberOfDeposits, setMaxNumberOfDeposits] = React.useState("");
  const [depositIntervalInDays, setDepositIntervalInDays] = React.useState("");


  const [nameHasError, setNameError] = React.useState(false);
  const [downPaymentAmountHasError, setDownPaymentAmountError] = React.useState(false);
  const [depositAmountHasError, setDepositAmountError] = React.useState(false);
  const [maxNumberOfDepositsHasError, setMaxNumberOfDepositsError] = React.useState(false);
  const [depositIntervalInDaysHasError, setDepositIntervalInDaysError] = React.useState(false);

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
      depositStartTimestamp: depositStartTimestamp.toISOString(),
      depositAmount,
      maxNumberOfDeposits,
      depositIntervalInDays,
      category: route.params.selectedCategory.name,
      iconId: route.params.selectedCategory.iconId
    };

    console.log(newInvestment);
    sendForm(newInvestment);
  };

  const handleBack = async () => {
    navigation.goBack();
  };

  const handleViewReturns = () => {
    if(checkForErrors()){
      Alert.alert("Validation error", "Please correct selected fields and try again.");
      return;
    }

    navigation.navigate("investment-chart", {
      investmentParams: {
        downPaymentAmount: parseFloat(downPaymentAmount),
        depositStartTimestamp: depositStartTimestamp.toISOString(),
        depositAmount: parseFloat(depositAmount),
        maxNumberOfDeposits: parseInt(maxNumberOfDeposits),
        depositIntervalInDays: parseInt(depositIntervalInDays)
      }
    });
  }

  const checkForErrors = () => {
    let nameErr = checkNameError();
    let downPaymentAmountErr = checkDownPaymentAmountError();
    let depositAmountErr = checkDepositAmountError();
    let numberDepositsErr = checkMaxNumberOfDepositsError();
    let depositIntervalErr = checkDepositIntervalInDaysError();

    return (
      nameErr || 
      downPaymentAmountErr || 
      depositAmountErr || 
      numberDepositsErr || 
      depositIntervalErr
    );
  };

  const checkNameError = () => {
    let regex = /^[A-Za-z\d\s]+$/;
    let isValid = regex.test(name);
    setNameError(!isValid);
    return !isValid;
  };

  const checkDownPaymentAmountError = () => {
    let regex = /^[\d]{1,12}((\.)(\d){1,2})?$/;
    let isValid = regex.test(downPaymentAmount);
    setDownPaymentAmountError(!isValid);
    return !isValid;
  };

  const checkDepositAmountError = () => {
    let regex = /^[\d]{1,12}((\.)(\d){1,2})?$/;
    let isValid = regex.test(depositAmount);
    setDepositAmountError(!isValid);
    return !isValid;
  };

  const checkMaxNumberOfDepositsError = () => {
    let regex = /^[\d]{1,9}$/;
    let isValid = regex.test(maxNumberOfDeposits);
    setMaxNumberOfDepositsError(!isValid);
    return !isValid;
  };

  const checkDepositIntervalInDaysError = () => {
    let regex = /^[\d]{1,9}$/;
    let isValid = regex.test(depositIntervalInDays);
    setDepositIntervalInDaysError(!isValid);
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

        <Text style={{color: "#343434"}}>Category</Text>
        <ListItem containerStyle={{marginBottom: 20}}>
          <Icon name={iconFactory(route.params.selectedCategory.iconId)} type="entypo" />
          <ListItem.Content>
            <ListItem.Title>{route.params.selectedCategory.name}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        
        <Text style={{color: "#343434"}}>Name</Text>
        <AppInput.Investment
          value={name}
          onChangeText={setName}
          errorMessage={nameHasError? "Concept may only contain letters or numbers" : null}
          onEndEditing={checkNameError}
        />

        <Text style={{color: "#343434"}}>Down Payment Amount</Text>
        <AppInput.Amount
          value={downPaymentAmount}
          onChangeText={setDownPaymentAmount}
          errorMessage={downPaymentAmountHasError? "Amount must be positive and limited to cent precision" : null}
          onEndEditing={checkDownPaymentAmountError}
        />

        <Text style={{color: "#343434"}}>Starting time</Text>
        <AppInput.Time
          value={depositStartTimestamp}
          onPress={() => setStartDateOpen(true)}
        />

        <Text style={{color: "#343434"}}>Deposit Amount</Text>
        <AppInput.Amount
          value={depositAmount}
          onChangeText={setDepositAmount}
          errorMessage={depositAmountHasError? "Amount must be positive and limited to cent precision" : null}
          onEndEditing={checkDepositAmountError}
        />

        <Text style={{color: "#343434"}}>Number of deposits</Text>
        <AppInput.Integer
          value={maxNumberOfDeposits}
          onChangeText={setMaxNumberOfDeposits}
          errorMessage={maxNumberOfDepositsHasError? "Number must be positive and integer" : null}
          onEndEditing={checkMaxNumberOfDepositsError}
        />

        <Text style={{color: "#343434"}}>Deposit interval (days)</Text>
        <AppInput.Integer
          value={depositIntervalInDays}
          onChangeText={setDepositIntervalInDays}
          errorMessage={depositIntervalInDaysHasError? "Number must be positive and integer" : null}
          onEndEditing={checkDepositIntervalInDaysError}
        />

        <DatePicker
          modal
          mode="datetime"
          open={startDateOpen}
          date={depositStartTimestamp}
          onConfirm={(selectedDate) => {
            setStartDateOpen(false);
            setDepositStartTimestamp(selectedDate);
          }}
          onCancel={() => {
            setStartDateOpen(false);
          }}
        />

        <TouchableOpacity style={styles.cancelButton} onPress={handleViewReturns}>
          <Text style={styles.cancelButtonText}>View Investment Returns</Text>
        </TouchableOpacity>

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
