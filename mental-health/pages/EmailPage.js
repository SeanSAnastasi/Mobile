import React from 'react';
import {FlatList,Text,View,StyleSheet,Image,TextInput} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Icon } from 'react-native-elements';
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
    image:{
        alignContent: 'center',
        marginRight: '2%'
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
        alignItems: 'center',
        justifyContent:'center'
    },
    column:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center'
    },
    row2:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent:'center'
    },
    image:{
        width: 24,
        height: 24,
        alignContent: 'center',
        marginLeft: 34
    },
    input:{
        height: 40,
        borderColor: '#D3D3D3',
        borderBottomWidth : 1.0,
        width:'90%',
        marginTop: '3%'
    },
    end:{
      justifyContent:"flex-end"
    }
  });
export class EmailPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            chats:[],
            chatText:''
        }
    }
    componentDidMount(){
        this.setState({chats:[{descripcion:"Lore ipsum",datePosted: new Date().toString(),username:'Alice'}],chatText:''},()=> console.log(this.state.chats));
    }
    getParsedDate(strDate){
        return strDate.split("GMT")[0];
    }
    send(){
        // Replace username for user connected name
        this.setState( prevState => ({
            chats: [ ...prevState.chats,{datePosted: new Date().toString(), descripcion: this.state.chatText,username: 'Alice'}]
         }));
    }
    render(){
        return (<View style={styles.container}><FlatList style={styles.card}
            data={this.state.chats}
            renderItem={({item}) => <Card style={styles.border}>
            <Card.Content>
              <View style={styles.row}>
                  <Paragraph>Posted by {item.username}</Paragraph>
                <View style={[{flex:1,flexDirection:'row',marginLeft:'5%'}]}>
                    <Title>{item.descripcion}</Title>
                </View>
               {/* <View style={styles.end}><Image style={styles.image}
                    source={require('../assets/plus.png')}
                    /> 
                </View>*/}
              </View>
              <Paragraph>Posted: {this.getParsedDate(item.datePosted)}</Paragraph>
            </Card.Content>
          </Card>}
          />
          <View style={styles.row2}>
              <TextInput
        style={styles.input}
        placeholder="Type here to chat"
        onChangeText={text => this.setState({chatText: text})}
        defaultValue={this.state.chatText}
      /><Icon name="send" color="#E59400" onPress={()=> this.send()} /></View>
          </View>)
    }
}

export default EmailPage;