import React from 'react';
import {Text,View,StyleSheet,TextInput,Button} from 'react-native';
import firebase from 'firebase';
if (!firebase.apps.length) {
    firebase.initializeApp(config);
    }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      justifyContent: 'flex-start'
    },
    welcome:{
      fontSize: 24,
      marginTop: '3%'
    },
    signIn:{
      fontSize: 24,
      marginTop: '5%'
    },
    paragraph:{
      fontSize: 18
    },
    card:{
        width: '100%'
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'flex-start'

    },
    input:{
        height: 40,
        borderColor: '#D3D3D3',
        borderBottomWidth : 1.0,
        width:'90%',
        marginTop: '3%'
    },
    input2:{
        height: '60%',
        borderColor: '#D3D3D3',
        borderBottomWidth : 1.0,
        width:'90%',
        marginTop: '3%'
    },
    image:{
        alignContent: 'center',
        marginRight: '2%'
    },
    postTitle:{
        fontSize: 16
    },
    border:{
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
    },
    butContainer:{
        height: '5%',
        marginTop: '3%',
        alignContent:'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    butContainer2:{
        width: '100%',

        flexDirection: 'row'
    }
  });
export class PostThread extends React.Component{
    constructor(props){
        super(props);
        console.log(props.route.params);
        this.state = {
            forum: props.route.params,
            titleThread: '',
            post: ''
        }
    }
    postThread(){
        console.log('New Post');
        var newItem = { PostTitle: this.state.titleThread,Thread:{Comments:[]}}
        firebase.database().ref('ListOfForums/'+this.state.forum.ForumID+'/ListOfPosts').child(this.state.forum.ListOfPosts.length).set(newItem);
        this.props.navigation.navigate("Post", this.state.forum);
    }
    render(){
        return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Post a Thread</Text>
            <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={text => this.setState({titleThread: text})}
        defaultValue={this.state.titleThread}
      />
      <View style={styles.butContainer}>
       <Button style={styles.but} title="Submit" color="#E59400" onPress={() =>
            this.postThread()
          }></Button>
          </View>
        </View>)
    }
}
export default PostThread;