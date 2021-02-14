import { orange } from '@material-ui/core/colors';
import React from 'react';
import {Text,StyleSheet,View,TextInput,Button,Image} from 'react-native';
import firebase from 'firebase';
let config = {
    databaseURL: "https://mental-health-3223c-default-rtdb.firebaseio.com/",
    projectId: "mental-health-3223c",
  };
  if (!firebase.apps.length) {
  firebase.initializeApp(config);
  }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    welcome:{
      fontSize: 18,
      marginTop: '20%',
      marginLeft: '5%'
    },
    signIn:{
      fontSize: 24,
      marginTop: '5%',
    },
    paragraph:{
      fontSize: 18,
    },
    input:{
        height: 40,
        borderColor: '#D3D3D3',
        borderBottomWidth : 1.0,
        width:'90%',
        marginTop: '3%'
    },
    butContainer:{
        width: '80%',
        height: '5%',
        marginTop: '5%',
        alignContent: 'center'
    }
  });
export class ProfilePage extends React.Component {
    
    constructor(props){
      super(props);
        this.state = {
          username: props.route.params.user && props.route.params.user.displayName?props.route.params.user.displayName:"",
          email: props.route.params.user && props.route.params.user.email?props.route.params.user.email:"",
        enableButton: true
    };
      console.log(props.route.params);
    }
    _toForum = activity => {
      let self = this;
      firebase.database().ref('ListOfUsers/').once('value', function (snapshot) {
          console.log('Users:',snapshot.val());
          let email=false
          for(let item of snapshot.val()){
              if (item.email==self.state.email){
                email=true
                break
              }
              console.log(item);
          }
          if (!email){
            var newItem = { UserID: self.state.email,email:self.state.email, Username:self.state.username}
            firebase.database().ref('ListOfUsers').child(snapshot.val().length).set(newItem);
        
          }
          self.props.navigation.reset({
            index: 0,
            routes: [{ name: 'APP' }],
          });
      });
        
        
      };
    render(){
        return(
        <View style={styles.container}>
            <Text style={styles.welcome}>Set an unique user name and profile picture</Text>
            <Image
        style={styles.tinyLogo}
        source={require('../assets/uploadphoto.png')}
      />
            <TextInput
        style={styles.input}
        placeholder="Your username"
        onChangeText={text => this.setState({username: text, enableButton: true})}
        defaultValue={this.state.username}
      />
        <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => this.setState({email: text, enableButton: true})}
        defaultValue={this.state.email}
      />
       <View style={{ height: 100, marginTop: '10%',width:'80%' }}>
      <Button style={styles.but} title="CONTINUE" color="#E59400" disabled={!this.state.enableButton}  onPress={() =>
            this._toForum()
          }></Button>
      </View>
        </View>);
    }
}

export default ProfilePage;