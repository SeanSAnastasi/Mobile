import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { IconButton, Colors} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import {
  GoogleSigninButton,
  statusCodes,
  } from 'react-native-google-signin';
import * as GoogleSignIn from 'expo-google-sign-in';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    welcome:{
      fontSize: 24,
      marginTop: '20%'
    },
    signIn:{
      fontSize: 24,
      marginTop: '5%'
    },
    paragraph:{
      fontSize: 18
    },
    button: {
      borderRadius: 20,
      padding: 10,
      marginBottom: 20,
      shadowColor: '#303838',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      shadowOpacity: 0.35,
    }
  });
export class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user: null
    }
  }
    _toProfile = activity => {
        this.props.navigation.navigate("Profile");
      };
      componentDidMount() {
        this.initAsync();
      }
    
      initAsync = async () => {
        await GoogleSignIn.initAsync({
          // You may ommit the clientId when the firebase `googleServicesFile` is configured
        });
        this._syncUserWithStateAsync();
      };
    
      _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        console.log('User Gmail',user);
        this.setState({ user:user },()=>{
          this.props.navigation.navigate("Profile",{user:this.state.user});
        });
      };
    
      signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        this.setState({ user: null });
      };
    
      signInAsync = async () => {
        try {
          await GoogleSignIn.askForPlayServicesAsync();
          const { type, user } = await GoogleSignIn.signInAsync();
          if (type === 'success') {
            this._syncUserWithStateAsync();
          }
        } catch ({ message }) {
          alert('login: Error:' + message);
        }
      };
    
      login = () => {
        console.log('Login');
        if (this.state.user) {
          console.log('User Gmail',this.state.user);
          this.signOutAsync();
        } else {
          this.signInAsync();
          
        }
      };
    render(){
        return ( <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to APP</Text>
            <IconButton
          icon={require('../assets/people.png')}
          color={Colors.orange500}
          size={56}
        />
        <Text style={styles.paragraph}>A safe place to connect with users like you</Text>
        <Text style={styles.signIn}>Sign in below to get started</Text>
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <Button  style={{width: '100%', marginTop:'1%', height: '2%'}} title="Sign in with Google" onPress={() =>this.login()}></Button>
                {/*<IconButton
          icon={require('../assets/facebook.png')}
          color={Colors.blue700}
          size={56}
          onPress={() =>
            this._toProfile()
          }
        />

      <IconButton
          icon={require('../assets/twitter.png')}
          color={Colors.tealA700}
          size={56}
          onPress={() =>
            this._toProfile()
          }
        />
        *
        <TouchableOpacity style={styles.button} onPress={()=>{this._toProfile()}}>
          <Image source={require("../assets/twitter.png")} onPress={()=>{this._toProfile()}}
          />
        </TouchableOpacity>
       <IconButton
          icon={require('../assets/instagram.png')}
          color={Colors.brown500}
          size={56}
          onPress={() =>
            this._toProfile()
          }
        />
      <IconButton
          icon={require('../assets/mail.png')}
          color={Colors.red900}
          size={56}
          onPress={() =>
            //onGoogleButtonPress()
            this.login()
          }
        />*/}
        </View>
          </View>)
    }
}

export default HomePage;