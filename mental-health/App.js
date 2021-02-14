import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Icon } from 'react-native-elements'
import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import {ProfilePage} from './pages/ProfilePage';
import {TabsPage} from './pages/TabsPage';
import {HomePage} from './pages/HomePage';
import { createStackNavigator } from '@react-navigation/stack';
import PostPage from './pages/PostPage';
import PostThread from './pages/PostThread';
import CommentsPage from './pages/CommentsPage';

const Stack = createStackNavigator();

const state = {
  searchText: ''
}

export default function App() {
  navigationOptions = () => {
    return {
      headerRight: (
        <TouchableOpacity style={{ marginHorizontal: 10 }}>
          <Icon name="search" color="#E59400" />
        </TouchableOpacity>
      )
    }}
  function navigateToProfile(){
    return;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={HomePage}
        />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="APP" component={TabsPage} options={{headerRight: (props) => (
        <TouchableOpacity style={{ marginHorizontal: 10 }}>
          <View style={styles.row}>
           <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={text => this.setState({searchText: text})}
        defaultValue={state.searchText}
      />
          <Icon name="search" color="#E59400" onPress={()=> this.search()} />
          </View>
        </TouchableOpacity>
      )}} />
        <Stack.Screen name="Post" component={PostPage} />
        <Stack.Screen name="Add Thread" component={PostThread} />
        <Stack.Screen name="Comments" component={CommentsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '30%',
    height: '100%'
  },
  welcome:{
    fontSize: 24,
    fontFamily: 'Arial'
  },
  input:{
    borderColor: '#D3D3D3',
    borderBottomWidth : 1.0,
    width:'300%',
    marginTop: '3%'
},
  signIn:{
    fontSize: 24,
    marginTop: '5%',
    fontFamily: 'Arial'
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
},
  paragraph:{
    fontSize: 18,
    fontFamily: 'Arial'
  }
});
