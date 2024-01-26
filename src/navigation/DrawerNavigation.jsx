import TableScreen from '../screens/TableScreen';
import ChangePassScreen from '../screens/ChangePassScreen';
import ForgottenPasswordScreen from '../screens/ForgottenPasswordScreen';
import PieScreen from '../screens/PieScreen';
import BarScreen from '../screens/BarScreen';
import SplashScreen from '../screens/SplashScreen';
import CustomDrawer from '../components/CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import BudgetStack from '../navigation/BudgetStack';
import ExpenseStack from '../navigation/ExpenseStack';
import { useAuthentication } from '../hooks/authentication';
import InvestmentStack from './InvestmentStack';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = (props) => {
  const { isLoading, isAnonymous } = useAuthentication();

  return (
    <Drawer.Navigator 
    drawerContent={CustomDrawer}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: '#E86DC3',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        marginLeft: -25,
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
      },
    }} 
    backBehavior='history'>
    {isLoading ? (
      // Still retrieving or verifying credentials

      <>
        <Drawer.Screen 
          name="Splash" 
          component={SplashScreen} 
        />
      </>
    ) : isAnonymous ? (
      // Credentials retrieved but invalid

      <>
        <Drawer.Screen
          name="Login" 
          component={LoginScreen} 
          options={{
            title: "Log in",
            animationTypeForReplace: isAnonymous ? 'pop' : 'push',
            drawerIcon: ({color}) => (
              <Ionicons name="log-in-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="SignUp" 
          component={RegisterScreen} 
          options={{
            title: "Sign up",
            drawerIcon: ({color}) => (
              <Ionicons name="create-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="forgotten-password"
          component={ForgottenPasswordScreen}
          options={{
            title: "Forgot your password?",
            drawerIcon: ({color}) => (
              <Ionicons name="help-outline" size={22} color={color} />
            ),
          }}
        />
      </>
    ) : (
      // Credentials retrieved and authenticated

      <>
        <Drawer.Screen
          name="Table"
          component={TableScreen} 
          options={{
            title: "My expenses",
            drawerIcon: ({color}) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),

          }}
        />
        <Drawer.Screen 
          name="Budgets"
          component={BudgetStack}
          options={{
            title: "Budgets",
            drawerIcon: ({color}) => (
              <Ionicons name="cash-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Investments" 
          component={InvestmentStack}
          options={{
            title: "Investments",
            drawerIcon: ({color}) => (
              <Ionicons name='business-outline' size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name='Add Expense'
          component={ExpenseStack}
          options={{
            title: "Add Expense",
            drawerIcon: ({color}) => (
              <Ionicons name="add" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="GraphScreen"
          component={PieScreen} // Use a separate component for the screen
          options={{
          title: "Pie-Chart",
          drawerIcon: ({color}) => (
              <Ionicons name="bowling-ball-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="BarScreen"
          component={BarScreen} // Use a separate component for the screen
          options={{
          title: "Bar-Chart",
          drawerIcon: ({color}) => (
              <Ionicons name="analytics-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="ChangePassScreen"
          component={ChangePassScreen} // Use a separate component for the screen
          options={{
            title: "Change password",
            drawerIcon: ({color}) => (
              <Ionicons name="lock-closed-outline" size={22} color={color} />
            ),
          }}
        />
      </>
    )}
    </Drawer.Navigator>
  );
};
