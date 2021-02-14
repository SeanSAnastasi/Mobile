import React from 'react';
import {FlatList,Text,View,StyleSheet,Image} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
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
    border:{
      borderBottomWidth: 1,
      borderBottomColor: '#D3D3D3',
  },
    row:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        width: 24,
        height: 24,
        alignContent: 'center',
        marginLeft: 34
    },
    end:{
      justifyContent:"flex-end"
    }
  });
export class ForumListPage extends React.Component{
   
    constructor(props){
        super(props);
        this.state ={
            forums: []
        }
    }
componentDidMount(){
    let self = this;
    firebase.database().ref('ListOfForums/').once('value', function (snapshot) {
        console.log(snapshot.val());
        for(let item of snapshot.val()){
            console.log(item);
        }
        self.setState({forums:snapshot.val()});
    });
}
navigateToPost(forum){
    this.props.navigation.navigate("Post", forum);
}
 render(){
     return (
     <View style={styles.container}>
         <Text style={styles.welcome}>List of Forums</Text>
         <FlatList style={styles.card}
        data={this.state.forums}
        renderItem={({item}) => <Card style={styles.border}>
        <Card.Content>
          <View style={styles.row}>
            <View style={[{flex:1,flexDirection:'row'}]}>
                <Title>{item.ForumName}</Title>
            </View>
           {/* <View style={styles.end}><Image style={styles.image}
                source={require('../assets/plus.png')}
                /> 
            </View>*/}
          </View>
          <Paragraph>{item.Description}</Paragraph>
        </Card.Content>
        <Card.Actions style={{flex: 1}}>
        <View style={styles.row}>
        <View style={[{flex:1,flexDirection:'row'}]}>
          </View>
        <View style={styles.end}>
      <Button style={{ alignSelf: "flex-end" }} color="#E59400" onPress={() => this.navigateToPost(item)}>View</Button>
      </View>
      </View>
    </Card.Actions>
      </Card>}
      />
    </View>)
 }
}

export default ForumListPage;