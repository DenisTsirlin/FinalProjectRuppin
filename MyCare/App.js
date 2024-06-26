// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './Pages/Login';
import Register from './Pages/Register';
import HomePage from './Pages/HomePage';
import UserManagementScreen from './Pages/UserManagementScreen';
import AddVehicleScreen from './Pages/AddVehicleScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Login') {
                        iconName = focused ? 'log-in' : 'log-in-outline';
                    } else if (route.name === 'Register') {
                        iconName = focused ? 'person-add' : 'person-add-outline';
                    } else if (route.name === 'HomePage') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'User Management') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Add Vehicle') {
                        iconName = focused ? 'car' : 'car-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Register" component={Register} />
            <Tab.Screen name="HomePage" component={HomePage} />
            <Tab.Screen name="User Management" component={UserManagementScreen} />
            <Tab.Screen name="Add Vehicle" component={AddVehicleScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="HomePage" component={MainTabs} options={{ headerShown: false }} />
                <Stack.Screen name="User Management" component={MainTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Add Vehicle" component={MainTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
