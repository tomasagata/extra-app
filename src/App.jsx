import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthenticationProvider } from './context/AuthenticationProvider';
import { DrawerNavigation } from './navigation/DrawerNavigation';
import { useNotificationHandler } from './hooks/notifications';

const Stack = createStackNavigator();
const queryClient = new QueryClient();
const linking = {
  prefixes: [
    "extra://",
    "http://extra"
  ],
  config: {
    screens: {
      "reset-password": "reset-password/:token"
    }
  }
}; 


const App = () => {
  useNotificationHandler();

  return (
    <QueryClientProvider client={queryClient}>
    <AuthenticationProvider>
    <SafeAreaProvider>

    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName='drawer'>
        <Stack.Screen 
          name="drawer"
          component={DrawerNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="reset-password"
          component={ResetPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

    </SafeAreaProvider>
    </AuthenticationProvider>
    </QueryClientProvider>
  );
};

export default App;
