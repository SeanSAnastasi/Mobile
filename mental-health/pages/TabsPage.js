import React from 'react';
import {Text,StyleSheet,View,TextInput,Button,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {ForumListPage} from './ForumListPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PersonPage from './PersonPage';
import EmailPage from './EmailPage';
const Tab = createBottomTabNavigator();
export class TabsPage extends React.Component {
    render(){
        return(
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    return <Image
                    source={require('../assets/homeTab.png')}
                  />;
                  } 

                  if (route.name === 'Profile') {
                    return <Image
                    source={require('../assets/personTab.png')}
                  />;
                  } 

                  if (route.name === 'Email') {
                    return <Image
                    source={require('../assets/mailTab.png')}
                  />;
                  } 
                  
                  // You can return any component that you like here!
                  return <Image
                  source={require('../assets/homeTab.png')}/>;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}>
              <Tab.Screen name="Home" component={ForumListPage} />
              <Tab.Screen name="Email" component={EmailPage} />
              <Tab.Screen name="Profile" component={PersonPage} />
            </Tab.Navigator>)
    }
}

export default TabsPage;