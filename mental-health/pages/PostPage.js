import React from 'react';
import {FlatList,Text,View,StyleSheet,Image,Button} from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
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
export class PostPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            forum: props.route.params
        }
        console.log(this.state.forum.ListOfPosts[0]);
    }
    postThread(forum){
        this.props.navigation.navigate("Add Thread", forum);
    }
    componentDidUpdate(){
        console.log('Update');
        let self = this;
        firebase.database().ref('ListOfForums/'+this.state.forum.ForumID).once('value', function (snapshot) {
            console.log(snapshot.val());
            self.setState({forum:snapshot.val()});
        });
    }
    toComments(forum){
        this.props.navigation.navigate("Comments", forum);
    }
    render(){
        return (<View style={styles.container}>
            <Text style={styles.welcome}>{this.state.forum.ForumName}</Text>
            <View style={styles.butContainer}>
            <Button style={styles.but} title="Post Thread" color="#E59400" onPress={() =>
            this.postThread(this.state.forum)
          }></Button>
          </View>
            <FlatList style={styles.card}
        data={this.state.forum.ListOfPosts}
        keyExtractor={(item)=>item.key}
        renderItem={({item}) => <Card style={styles.border} onPress={()=>{this.toComments(this.state.forum)}}>
        <Card.Content>
            <View style={styles.row}>
                <Image style={styles.image}
                  source={require('../assets/user.png')}/>
          <Text style={styles.postTitle}>{item.PostTitle}</Text>
                  </View>
        </Card.Content>
      </Card>}
      />
       </View>)
    }
}
export default PostPage;